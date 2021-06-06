import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
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
  formControl: {
    margin: theme.spacing (0),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing (2),
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

export default function SubCategoryModal({
  open,
  setOpen,
  addSuccess,
  addCategory,
  addLoading,
  name,
  setName,
  slug,
  setSlug,
  submitHandler,
  parentCate,
  parent,
  setParent,
  handleChange,
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
                    <FormControl
                      variant="outlined"
                      fullWidth
                      className={classes.formControl}
                    >
                      <InputLabel id="parent-Category">
                        Parent Category
                      </InputLabel>
                      <Select
                        labelId="Parent Category"
                        id="parent-Category"
                        value={parent}
                        label="Parent Category"
                        onChange={handleChange}
                      >
                        {parentCate &&
                          parentCate.map (cate => (
                            <MenuItem key={cate._id} value={cate}>
                              {cate.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
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
