import React, {useEffect, useState} from 'react';
import Card from '../productCard/Card';
import useStyles from './style';
import {listProducts} from '../../redux/actions/productAction';
import {useSelector, useDispatch} from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import Skeleton from '@material-ui/lab/Skeleton';

import {
  Container,
  Grid,
  Paper,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Box,
} from '@material-ui/core';
import Header from '../header/Header';

import {Meta} from '../index';
import NotFound from '../../screens/ErrorPages/NotFound';

const Products = ({match, history}) => {
  const classes = useStyles ();
  const [page, setPage] = useState (1);
  const [limit, setLimit] = useState (20);
  const [sortBy, setSortBy] = useState ('');
  const keyword = match.params.keyword;
  // const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch ();
  const productList = useSelector (state => state.productList);
  const {loading, products, count, total} = productList;

  useEffect (
    () => {
      dispatch (listProducts (sortBy, limit, page, keyword));
    },
    [dispatch, keyword, sortBy, limit, page]
  );

  return (
    <main>
      <Header history={history} />
      <Meta title="Shop" />
      <Box mt={12} />
      <Container xs={12} style={{marginTop: 10}}>
        <Grid container spacing={2}>
          {/* Header */}

          {/* Short By */}
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={0} className={classes.header}>
                <Typography variant="body1" className={classes.headertext}>
                  Showing {products.length ? products.length : 0} of{' '}
                  {count ? count : 0}
                </Typography>
                <FormControl
                  variant="outlined"
                  size="small"
                  className={classes.formControl}
                >
                  <InputLabel htmlFor="shortby">Short By</InputLabel>
                  <Select
                    id="shortby"
                    value={sortBy}
                    onChange={e => setSortBy (e.target.value)}
                    label="Short By"
                  >
                    <MenuItem value={'-createdAt'}>Revelance</MenuItem>
                    <MenuItem value={'rating'}>Popularity</MenuItem>
                    <MenuItem value={'price'}>Low to High</MenuItem>
                    <MenuItem value={'-price'}>High to low</MenuItem>
                  </Select>
                </FormControl>
              </Paper>
            </Grid>
            {/*  All products */}
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
              : products.length <= 0
                  ? <NotFound />
                  : products.map (product => (
                      <Grid item lg={2} key={product._id}>
                        <Card product={product} />
                      </Grid>
                    ))}
          </Grid>

          <Grid item xs={12}>
            <Box mt={6}>
              {total / limit > 1 &&
                <Pagination
                  count={total / limit}
                  onChange={(e, v) => setPage (v)}
                  shape="rounded"
                  variant="outlined"
                  color="primary"
                />}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default Products;

// {
/* <Grid container item xs={3} className={classes.sidebar}>
<Grid item xs={12}>
  <Typography variant="body1" className={classes.title}>
    Filters
  </Typography>
  <Box className={classes.sideContent}>
    <Typography variant="body2">Customer Rating</Typography>
    <Divider />
    {[5, 4, 3, 2, 1].map((rating, index) => (
      <Typography
        variant="subtitle2"
        className={classes.ratingfilter}
        key={index}
      >
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label={<Rating defaultValue={rating} readOnly={true} />}
        />
        & More
      </Typography>
    ))}

    <Typography variant="body2" style={{ marginTop: "10px" }}>
      Category{" "}
    </Typography>
    <Divider />
    {["Men", "Women", "Kids", "All"].map((item, index) => (
      <Typography
        variant="subtitle2"
        className={classes.ratingfilter}
        key={index}
      >
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label={item}
        />
      </Typography>
    ))}
  </Box>
</Grid>
</Grid> */
// }
