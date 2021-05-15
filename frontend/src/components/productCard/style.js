import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "block",
    overflow: "hidden",
    transition: "all 0.5s",
    zIndex: 1,
    borderRadius: "0",
    "&:hover": {
      boxShadow: theme.shadows[2],

      "& .MuiCardContent-root": {
        color: theme.palette.primary.main,
      },
      "& .MuiBox-root": {
        right: 10,
        opacity: 1,
      },
    },
  },
  media: {
    transition: "0.5s background ease-in-out",
    backgroundPosition: "top center",
    height: "300px",
    backgroundSize: "cover",
  },
  content: {
    display: "block",
    transition: "all 0.3s",
  },

  actions: {
    position: "absolute",
    top: "10px",
    right: "-100%",
    transition: "all 0.3s ease-in-out",
    opacity: "0",
    display: "flex",
    flexDirection: "column",
    "& .MuiIconButton-root": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      fontSize: "16px",
      padding: "10px",
      marginBottom: "5px",
    },
  },
  arrow: {
    color: theme.palette.common.secondary,
  },
  tooltip: {
    backgroundColor: theme.palette.primary.main,
  },

  titleWrapper: {
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "wrap",
    "& .MuiTypography-root": {
      fontSize: "14px",
      textTransform: "capitalize",
    },
    "& .MuiRating-root": {
      fontSize: "16px",
    },
  },
  title: {
    fontSize: "14px",
  },
}));
