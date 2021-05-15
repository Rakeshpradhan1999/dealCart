import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckOutSteeper from "./CheckOutSteeper";
import PriceDetail from "../../components/priceDetails/PriceDetail";
import LgCart from "../cartScreen/LgCart";
import { createOrder } from "../../redux/actions/orderAction";
import { ORDER_CREATE_RESET } from "../../redux/types/orderTypes";
import { Header } from "../../components/index";
import useStyles from "./styles";
import { Grid, Container, Box, Paper, Typography } from "@material-ui/core";
import { Title } from "../../components";
const OrderSummary = ({ history }) => {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    history.push("/payment");
  }
  const dispatch = useDispatch();

  const { shippingAddress, cartItems } = cart;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  // const removeHandler = (id) => {
  // 	dispatch(cartRemove(id));
  // };

  const toPrice = (num) => Number(num.toFixed(2));

  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

  const btnHandler = () => {
    // history.push('/payment');
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, dispatch, history, order]);
  return (
    <div>
      <Header history={history} />
      <Box mt={12} />

      <Container>
        <CheckOutSteeper activeStep={3} />
        <Grid container style={{ width: "100%" }} spacing={3}>
          <Grid container item xs={8}>
            <Grid item xs={12}>
              <Paper className={classes.infoCard}>
                <Title text={"Shipping Details"} />
                <TextWrap
                  classes={classes}
                  info={shippingAddress.name}
                  title={"Name"}
                />

                <TextWrap
                  classes={classes}
                  info={shippingAddress.mobile}
                  title={"Contact"}
                />

                <TextWrap
                  classes={classes}
                  info={shippingAddress.address}
                  title={"Address"}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.infoCard}>
                <Title text={"Payment Method"} />
                <TextWrap
                  classes={classes}
                  info={cart.paymentMethod}
                  title={"Payment Mode"}
                />{" "}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.infoCard}>
                <Title text={"Your Items"} />
                <div className="w-100 d-none d-md-block">
                  {cartItems.map((item) => (
                    <LgCart item={item} key={item._id} trashbtn={false} />
                  ))}
                </div>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <PriceDetail btn formHandler={btnHandler} loading={loading} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default OrderSummary;

function TextWrap({ title, classes, info }) {
  return (
    <Box className={classes.textWrapper} mb={1}>
      <Typography variant="body1" style={{ fontWeight: "bold" }}>
        {title} :
      </Typography>
      <Typography variant="body1">{info}</Typography>
    </Box>
  );
}
