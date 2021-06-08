import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles (theme => ({
  root: {
    backgroundImage: 'url(/images/heading-bg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'left bottom',
    padding: theme.spacing (15, 0),
    textAlign: 'center',
    marginTop: theme.spacing (8),
  },
}));
const TitleSec = ({title = 'Title Here', caption = 'Caption Here'}) => {
  const classes = useStyles ();

  return (
    <div className={classes.root}>
      <Typography variant="h3" style={{fontWeight: 'bold'}}>{title}</Typography>
      <br />
      <Typography variant="body2">{caption}</Typography>
    </div>
  );
};

export default TitleSec;
