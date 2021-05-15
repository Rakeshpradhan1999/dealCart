import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 3.1, 3, 0),
    borderBottom: `2px solid ${theme.palette.grey[400]}`,
    position: "relative",
    marginBottom: theme.spacing(3),
    "&::after": {
      position: "absolute",
      content: "''",
      bottom: 0,
      left: 0,
      width: 50,
      height: 2,
      backgroundColor: theme.palette.primary.main,
      transform: "translatey(100%)",
    },
    "& h4": {
      fontSize: 18,
      fontWeight: "bold",
    },
  },
}));

const Title = ({ text }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h4">{text}</Typography>
    </Box>
  );
};

export default Title;
