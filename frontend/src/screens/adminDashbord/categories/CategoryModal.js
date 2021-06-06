import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {
  Modal,
  Backdrop,
  Typography,
  Grid,
  TextField,
  Paper,
  Button,
} from '@material-ui/core';
import {useSpring, animated} from '@react-spring/web';

const useStyles = makeStyles (theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing (2, 4, 3),
    width: '100%',
    maxWidth: '600px',
  },
  head: {
    fontWeight: 'bold',
    margin: '15px 0',
  },
}));

const Fade = React.forwardRef (function Fade (props, ref) {
  const {in: open, children, onEnter, onExited, ...other} = props;
  const style = useSpring ({
    from: {opacity: 0},
    to: {opacity: open ? 1 : 0},
    onStart: () => {
      if (open && onEnter) {
        onEnter ();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited ();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default function CategoryModal({
  open,
  setOpen,
  name,
  setName,
  slug,
  setSlug,
  submitHandler,
}) {
  const classes = useStyles ();

  const handleClose = () => {
    setOpen (false);
  };

  const changeHandler = e => {
    setName (e.target.value);
    setSlug (e.target.value);
  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div>
            <Paper className={classes.paper}>
              <Typography className={classes.head} variant="h6">
                Add Category
              </Typography>
              <form action="" onSubmit={submitHandler}>
                <Grid item container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="name"
                      label="Name"
                      value={name}
                      onChange={e => {
                        changeHandler (e);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="slug"
                      label="Slug"
                      value={slug}
                      onChange={e => {
                        setSlug (e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" type="submit" color="primary">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </div>

        </Fade>
      </Modal>
    </div>
  );
}
