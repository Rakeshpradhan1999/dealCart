import React from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    padding: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5),
    borderTop: `3px solid ${theme.palette.primary.main} `,
    "& h6": {
      fontWeight: 700,
    },
  },
}));

const AlertInfo = ({ text }) => {
  const classes = useStyles();
  return (
    <Grid item xs>
      <Paper className={classes.root}>
        <Typography color={"primary"} variant="body1" component={"p"}>
          Thanks You! We Recieved Your Order{" "}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default AlertInfo;
