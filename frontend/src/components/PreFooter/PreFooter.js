import React from "react";
import { Grid, Box, Typography, Container } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import PaymentIcon from "@material-ui/icons/Payment";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import LoopIcon from "@material-ui/icons/Loop";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    marginTop: theme.spacing(10),
    // marginBottom: theme.spacing(10),
    [theme.breakpoints.down("sm")]: {
      // marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
  },
  content: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    color: theme.palette.primary.main,
  },
  title: {
    fontWeight: "bold",
  },
}));

const data = [
  {
    icon: <LocalShippingIcon />,
    title: "Free WorldWide Shipping",
    subtitle: "On All Orders Above $100.00",
  },
  {
    icon: <PaymentIcon />,
    title: "100% Secure Checkout",
    subtitle: "PayPal / MasterCard / Visa",
  },
  {
    icon: <ContactSupportIcon />,
    title: "International Warranty",
    subtitle: "Offered in the country of usage",
  },
  {
    icon: <LoopIcon />,
    title: "Easy 30 Days Returns",
    subtitle: "30 days money back guarantee",
  },
];
const PreFooter = () => {
  const classes = useStyles();
  return (
    <Container xs={12} className={classes.root}>
      <Grid container spacing={4}>
        {data.map((item, i) => (
          <Grid key={i} item xs={12} sm={6} md={3} lg={3} xl={3}>
            <Box className={classes.content}>
              <Box className={classes.icon}>{item.icon}</Box>
              <Box mx={2}>
                <Typography variant="body1" className={classes.title}>
                  {item.title}
                </Typography>
                <Typography variant="caption">{item.subtitle}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PreFooter;
