import React from "react";
import { Link } from "react-router-dom";
import useStyles from "./style";
import {
  TextField,
  Typography,
  CircularProgress,
  Grid,
  Box,
  Button,
} from "@material-ui/core";

const Form = ({ formData }) => {
  const classes = useStyles();

  return (
    <div className={` ${classes.root}`}>
      <Grid container xs={12}>
        <Grid item sm={12} md={12} lg={6} xl={6} className={`${classes.form} `}>
          <Box className={classes.formcontrol}>
            <Typography
              color="primary"
              variant="h5"
              className={classes.brand}
              component={"h1"}
            >
              DealCart
            </Typography>
            <Box className={classes.welcomeTxt}>
              <Typography variant="h6">{formData.title}</Typography>
              <Typography variant="body1">{formData.subTitle}</Typography>
            </Box>

            <Box className={""}>
              <form onSubmit={formData.formHandler}>
                {formData.input.map((item, index) => (
                  <TextField
                    // size="small"
                    error={formData.error ? true : false}
                    helperText={formData.error ? "Invalid input" : ""}
                    key={index}
                    required
                    type={item.type}
                    name={item.type}
                    value={item.value}
                    onChange={(e) => item.setData(e.target.value)}
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
                  {formData.loading ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    formData.btnTxt
                  )}
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
                style={{ textDecoration: "underline" }}
              >
                {formData.linkTxt}
              </Typography>
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={6} className={classes.overlay}>
          <div className={classes.backImg}></div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Form;
