import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/Styles";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(3),
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.light,
    margin: theme.spacing(2, 0),
    "& .MuiBreadCrumbs-root": {
      margin: "0 auto",
    },
    "& .MuiLink-root": {
      fontSize: 14,
      cursor: "pointer",
    },
  },
}));

const BreadCrumb = ({ currentLink, ctext, restLink }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Breadcrumbs separator={<NavigateNextIcon />}>
        <Link href={"/"} color="inherit">
          Home
        </Link>
        {restLink &&
          restLink.map((item, index) => (
            <Link href={item.link} color="inherit" key={index}>
              {item.text}
            </Link>
          ))}
        <Link href={currentLink} aria-current="page" color="primary">
          {ctext}
        </Link>
      </Breadcrumbs>
    </Box>
  );
};

export default BreadCrumb;
