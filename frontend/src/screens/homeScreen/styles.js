import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
  },
  banner: {
    color: "white",
    transition: "all 0.3s",

    "& img": {
      width: "100%",
      transform: "scale(1.03)",
      transition: "all 0.5s",
    },
    width: "100%",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      "& img": {
        transform: "scale(1.1)",
      },

      // color: theme.palette.primary.main,
    },
  },
  space: {
    paddingTop: theme.spacing(5),
  },
  bannerContent: {
    position: "absolute",
    top: "0%",
    right: "0%",
    backgroundColor: "rgba(0,0,0,0.3)",
    height: "100%",
    width: "100%",
    textAlign: "right",
    padding: theme.spacing(2, 7),
    display: "flex",
    justifyContent: "center",
    alignItems: "right",
    flexDirection: "column",
    color: "inherit",
    transition: "all 0.5s",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2, 3),
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    },
  },
  bannerBtn: {
    textTransform: "capitalize",
    textDecoration: "underline",
    fontWeight: "bold",
    [theme.breakpoints.down("md")]: {
      fontSize: "12px",
    },
  },
  bannerTitle: {
    "& h5": {
      fontWeight: "bold",
      [theme.breakpoints.down("md")]: {
        fontSize: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
      },
    },
  },
  bannerHead: {
    [theme.breakpoints.down("md")]: {
      fontSize: "12px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    },
  },
}));

export default useStyles;
