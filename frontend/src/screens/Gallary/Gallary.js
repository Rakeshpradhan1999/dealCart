import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Layout from '../../components/Layout/Layout';
import {listProducts} from '../../redux/actions/productAction';
import Skeleton from '@material-ui/lab/Skeleton';

import {Grid, Typography, Box} from '@material-ui/core';
import Card from '../../components/productCard/Card';

const Gallary = () => {
  const dispatch = useDispatch ();
  const productList = useSelector (state => state.productList);
  const {loading, products, count, total} = productList;

  useEffect (
    () => {
      dispatch (listProducts ('-rating', 12));
    },
    [dispatch]
  );

  return (
    <Layout title="Gallary" caption="See Our Top Products">
      <Box mt={12} />
      <Grid container spacing={3}>
        {loading
          ? Array.from ({length: 12}).map ((item, index) => (
              <Grid item lg={2} key={index}>
                <Box>
                  <Skeleton width="100%" height="200px" animation="wave" />
                  <Skeleton width="100%" animation="wave">
                    <Typography>.</Typography>
                  </Skeleton>
                  <Skeleton width="100%" animation="wave">
                    <Typography>.</Typography>
                  </Skeleton>
                  <Skeleton width="100%" animation="wave">
                    <Typography>.</Typography>
                  </Skeleton>
                </Box>
              </Grid>
            ))
          : products.map (product => (
              <Grid item lg={2} key={product._id}>
                <Card product={product} />
              </Grid>
            ))}
      </Grid>
    </Layout>
  );
};

export default Gallary;
