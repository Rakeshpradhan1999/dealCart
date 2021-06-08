import React, {Fragment} from 'react';
import {Footer, Header} from '../index';
import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import TitleSec from '../TitleSection/TitleSec';

const useStyles = makeStyles (theme => ({
  root: {
    minHeight: '90vh',
    paddingTop: theme.spacing (2),
  },
}));

const Layout = ({children, title, caption}) => {
  const classes = useStyles ();
  return (
    <Fragment>
      <Header />
      <TitleSec title={title} caption={caption} />
      <main className={classes.root}>
        <Container>
          {children}
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
