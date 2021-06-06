import React from 'react';
import {Link} from 'react-router-dom';
import useStyles from './style';
import {
  TextField,
  Typography,
  CircularProgress,
  Grid,
  Box,
  Button,
} from '@material-ui/core';
import {Footer} from '../index';

const Form = ({formData}) => {
  const classes = useStyles ();

  return (
    <div className={` ${classes.root}`}>
      <Grid container item xs={12}>
        <Grid item sm={12} md={12} lg={6} xl={6} className={`${classes.form} `}>
          <Box className={classes.formcontrol}>

            <Box component={Link} to="/" className={classes.logo}>
              <img src="/images/logo.png" alt="" />
            </Box>
            <Box className={classes.welcomeTxt}>
              <Typography variant="h6">{formData.title}</Typography>
              <Typography variant="body1">{formData.subTitle}</Typography>
            </Box>

            <Box className={''}>
              <form onSubmit={formData.formHandler}>
                {formData.input.map ((item, index) => (
                  <TextField
                    // size="small"

                    key={index}
                    required
                    type={item.type}
                    name={item.type}
                    value={item.value}
                    onChange={e => item.setData (e.target.value)}
                    label={item.label}
                    variant="outlined"
                    rowsMax={4}
                  />
                ))}

                <Button
                  variant="contained"
                  fullWidth={true}
                  color="primary"
                  className={classes.button}
                  type="submit"
                >
                  {formData.loading
                    ? <CircularProgress color="secondary" />
                    : formData.btnTxt}
                </Button>
              </form>
            </Box>

            <Typography variant="body2">
              {formData.bottomTxt}
              &nbsp;&nbsp;&nbsp;
              <Typography
                variant="body1"
                component={Link}
                to={`/${formData.link}?redirect=${formData.redirect}`}
                color="primary"
                style={{textDecoration: 'underline'}}
              >
                {formData.linkTxt}
              </Typography>
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={6} className={classes.overlay}>
          <div className={classes.backImg} />
          <Box className={classes.formFooter}>
            <Footer />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Form;
