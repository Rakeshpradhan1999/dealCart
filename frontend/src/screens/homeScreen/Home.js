import React, { useEffect, useState } from "react";
import {
  Header,
  HomeSlider,
  Title,
  ProductsSlider,
  PreFooter,
} from "../../components/index";
import Banner from "./Banner/Banner";
import { Container, Grid, Box } from "@material-ui/core";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  topRatedProducts,
  menProducts as menProductsAction,
  kidsProducts as kidsProductsAction,
  womenProducts as womenProductsAction,
} from "../../redux/actions/productAction";

const Home = ({ history }) => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.topRatedProductList
  );

  const {
    products: menProducts,
    loading: menLoading,
    error: menError,
  } = useSelector((state) => state.menProductList);

  const {
    products: womenProducts,
    loading: womenLoading,
    error: womenError,
  } = useSelector((state) => state.woMenProductList);
  const {
    products: kidsProducts,
    loading: kidsLoading,
    error: kidsError,
  } = useSelector((state) => state.kidsProductList);

  useEffect(() => {
    dispatch(topRatedProducts());
    dispatch(kidsProductsAction());
    dispatch(menProductsAction());
    dispatch(womenProductsAction());
  }, [dispatch]);

  products && console.log(products);

  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Header history={history} />
        <Box mt={9} />
        <HomeSlider />
        <Container xs={12}>
          <Box className={classes.space}>
            <Banner />
          </Box>
          <Box className={classes.space}>
            <Title text="Top Rated Products" />
            <ProductsSlider
              products={products}
              loading={loading}
              error={error}
            />
          </Box>
          <Box className={classes.space}>
            <Title text="For Kids " />
            <ProductsSlider
              products={kidsProducts}
              loading={kidsLoading}
              error={kidsError}
            />
          </Box>
          <Box className={classes.space}>
            <Title text="For Mens" />
            <ProductsSlider
              products={menProducts}
              loading={menLoading}
              error={menError}
            />
          </Box>
          <Box className={classes.space}>
            <Title text="For WoMens" />
            <ProductsSlider
              products={womenProducts}
              loading={womenLoading}
              error={womenError}
            />
          </Box>
        </Container>
        <PreFooter />
      </div>
    </>
  );
};

export default Home;
