import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles (theme => ({
  root: {
    width: '100%',
    height: '50vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '& img': {
      width: '100%',
      maxWidth: '300px',
    },
  },
}));
const NotFound = () => {
  const classes = useStyles ();
  return (
    <div className={classes.root}>
      <img src="/images/notfound.png" alt="notfound" />
    </div>
  );
};

export default NotFound;
