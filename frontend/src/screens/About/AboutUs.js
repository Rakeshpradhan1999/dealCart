import React from 'react';
import Layout from '../../components/Layout/Layout';
import {Grid, Typography, Box, Button, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import {PreFooter} from '../../components/index';

const useStyles = makeStyles (theme => ({
  root: {},
  img: {
    '& img': {
      width: '100%',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: '',
  },
}));

const AboutUs = () => {
  const classes = useStyles ();

  return (
    <Layout title="About us" caption="Get more info about us">
      <Box mt={10} />
      <Grid
        item
        container
        xs={12}
        spacing={5}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} md={6}>
          <Box className={classes.img}>
            <img src="/images/about.png" alt="aboutimg" />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className={classes.content}>
            <Typography variant="h4" style={{fontWeight: 'bold'}}>
              Who we are <br /> & What we sell.
            </Typography>
            <Typography
              variant="body1"
              style={{lineHeight: '28px', margin: '10px 0'}}
            >
              Street art enamel pin etsy direct trade schlitz activated charcoal knausgaard shabby chic. Intelligentsia celiac authentic, jianbing cliche wayfarers stumptown chambray fanny pack pop-up bushwick vinyl messenger bag copper viral activated charcoal, everyday carry four dollar toast organic blog gastropub. Lyft chambray unicorn drinking vinegar, before they sold out
            </Typography>
            <Typography
              variant="body1"
              style={{lineHeight: '28px', margin: '10px 0'}}
            >
              Helvetica fingerstache leggings cliche synth, try-hard slow-carb raclette migas forage VHS vinyl typewriter live-edge. Swag portland drinking vinegar, squid umami green juice. Knausgaard raclette bitters, blue bottle typewriter
            </Typography>
            <Button
              component={Link}
              to="/contact"
              variant="contained"
              color="primary"
              style={{marginTop: '15px'}}
            >
              Contact Us
            </Button>
          </Box>
        </Grid>
      </Grid>
      <PreFooter />
    </Layout>
  );
};

export default AboutUs;
