import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles (theme => ({
  root: {
    '& img': {
      width: '100',
    },
  },
}));

const SomethingWrongPage = () => {
  return <div />;
};

export default SomethingWrongPage;
