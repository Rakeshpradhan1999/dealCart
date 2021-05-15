import React from "react";
import { Container, Paper, Typography, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const FormWrapper = ({ children, title, link, btntxt }) => {
  const classes = useStyles();
  return (
    <div>
      <Container xs={12}>
        <Grid container style={{ width: "100%" }} spacing={2}>
          <Grid item xs={12}>
            <Button
              startIcon={<KeyboardBackspaceIcon />}
              component={Link}
              to={link}
            >
              {btntxt}
            </Button>
          </Grid>
          <Grid item xs={6} className={classes.inputWrapper}>
            <Paper>
              <Typography variant="h6" className={classes.title}>
                {title}
              </Typography>
              {children}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default FormWrapper;
