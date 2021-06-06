import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // padding: "10px",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
    marginTop: "20px  ",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <p>@2021 DealCart.com allRights reserved</p>
    </div>
  );
};

export default Footer;
