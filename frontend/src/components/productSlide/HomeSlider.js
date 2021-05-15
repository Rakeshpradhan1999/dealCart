import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Autoplay } from "swiper";
import "swiper/swiper-bundle.css";
import slide1 from "./images/floral.jpg";
import slide2 from "./images/backpack.jpg";
import slide3 from "./images/carousel1.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Button, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
const options = {
  margin: 10,
  nav: false,
  autoplay: true,
  items: 1,
  loop: true,
};
const images = [
  {
    img: slide1,
    title: "40%",
  },
  {
    img: slide2,
    title: "30%",
  },
];
const useStyles = makeStyles((theme) => ({
  mainRoot: {
    overflow: "hidden",
  },

  root: {
    position: "relative",
  },
  backImg: {
    height: "80vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right top",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      height: "60vh",
    },
    [theme.breakpoints.down("sm")]: {
      height: "40vh",
    },
    [theme.breakpoints.down("xs")]: {
      height: "30vh",
    },
  },
  img: {
    zIndex: 0,
  },
  caption: {
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
    height: "100%",
  },
  title: {
    position: "relative",
    margin: theme.spacing(1, 0),
    [theme.breakpoints.down("md")]: {
      fontSize: "16px",
      "&:before": {
        height: 1,
      },
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      "&:before": {
        height: 0,
      },
    },

    "&:before": {
      content: "''",
      position: "absolute",
      bottom: 0,
      left: 0,
      backgroundColor: theme.palette.secondary.main,
      height: 2,
      width: 50,
    },
  },
  subTitle: {
    margin: theme.spacing(3, 0),
    "& h3": {
      fontWeight: "800",
    },

    [theme.breakpoints.down("md")]: {
      "& h3": {
        fontSize: "30px",
      },
    },
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 1, 1, 0),
      "& h3": {
        fontSize: "20px",
        display: "inline-block",
        marginRight: theme.spacing(1),
      },
    },
  },
  link: {
    textDecoration: "underline",
    fontWeight: "bold",
    letterSpacing: "1px",
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "10px",
    },
  },
}));

SwiperCore.use([EffectFade, Autoplay]);
const HomeSlider = () => {
  const classes = useStyles();

  return (
    <div>
      <Swiper
        id="main"
        navigation={false}
        loop={true}
        grabCursor={true}
        autoplay={{ delay: 2000 }}
        parallax={true}
        effect="fade"
        className={classes.mainRoot}
      >
        {images.map((image, i) => (
          <SwiperSlide key={i} className={classes.root}>
            <div
              className={classes.backImg}
              style={{ backgroundImage: `url(${image.img})` }}
            >
              <Container xs={12} className={classes.caption}>
                <Typography className={classes.title} variant="h6">
                  {image.title} Discount
                </Typography>
                <Box className={classes.subTitle}>
                  <Typography variant="h3" component={"h3"}>
                    Trending Fashions
                  </Typography>
                  <Typography variant="h3" component={"h3"}>
                    Collection
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    component={Link}
                    to="/products"
                    className={classes.link}
                  >
                    Shop Now
                  </Typography>
                </Box>
              </Container>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
