import React from "react";
import { Grid, Box, Typography, Button, Papper } from "@material-ui/core";
import img1 from "../images/cms-banner-1.jpg";
import img2 from "../images/cms-banner-2.jpg";
import useStyles from "../styles";
import { Link } from "react-router-dom";

const Banner = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12} sm={6}>
        <BannerChild img={img1} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <BannerChild img={img2} />
      </Grid>
    </Grid>
  );
};

function BannerChild({ img }) {
  const classes = useStyles();
  return (
    <Box className={classes.banner}>
      <img src={img} alt="" />
      <Box className={classes.bannerContent}>
        <Box my={1}>
          <Typography className={classes.bannerHead} variant="body1">
            Special Offer Deals
          </Typography>
        </Box>
        <Box my={1} className={classes.bannerTitle}>
          <Typography variant="h5" component="h5">
            Latest Fashion
          </Typography>
          <Typography variant="h5" component="h5">
            Collection
          </Typography>
        </Box>
        <Box my={1}>
          <Typography
            className={classes.bannerBtn}
            component={Link}
            variant="body1"
            to="/products"
          >
            shop now
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Banner;
