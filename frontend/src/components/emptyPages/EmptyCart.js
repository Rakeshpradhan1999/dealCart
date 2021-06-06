import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "80vh",
    width: "100%",
    maxWidth: "400px",
    margin: "auto",
  },
  image: {
    height: "100%",
    width: "100%",
    margin: "25% 0",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiButton-root": {
      marginTop: "40px",
    },
    "& img": {
      width: "100%",
    },
  },
}));

const EmptyCart = () => {
  const classes = useStyles();
  return (
    <Container>
      <Box className={classes.root}>
        <Box className={classes.image}>
          <img src="/images/Cartimage.svg" className="img-fluid" alt="" />
          <Button
            variant="contained"
            color="primary"
            to="/products"
            component={Link}
          >
            Go for Shopping
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EmptyCart;
