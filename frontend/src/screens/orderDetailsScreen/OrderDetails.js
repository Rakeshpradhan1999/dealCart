import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import LgCart from "../cartScreen/LgCart";
import { useDispatch, useSelector } from "react-redux";
import { Header, Loading, AlertInfo, Title } from "../../components/index";
import axios from "axios";
import useStyles from "./styles";
import Alert from "@material-ui/lab/Alert";
import {
  deliverOrder,
  detailsOrder,
  payOrder,
} from "../../redux/actions/orderAction";
import {
  ORDER_DELIVERED_RESET,
  ORDER_PAY_RESET,
} from "../../redux/types/orderTypes";
import {
  Grid,
  Container,
  Paper,
  Box,
  Divider,
  Button,
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

const OrderDetails = ({ history, match }) => {
  const classes = useStyles();
  const orderId = match.params.id;
  const [sdkReday, setSdkReady] = useState(false);
  const dispatch = useDispatch();

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, error: errorPay, success } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  console.log(order);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (
      !order ||
      success ||
      (order && order._id !== orderId) ||
      successDeliver
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVERED_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [orderId, dispatch, order, success, errorPay, successDeliver]);
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };
  return loading || loadingPay || loadingDeliver ? (
    <Loading />
  ) : error ? (
    <div>error</div>
  ) : (
    <div>
      <Header history={history} />
      <Box mt={12} />

      <Container xs={12}>
        <AlertInfo />
        <Grid container spacing={3}>
          <Grid container item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Grid item xs={12}>
              <Paper className={classes.infoCard}>
                <Title text={"Order Details"} />
                <TextWrap
                  info={order._id}
                  title={"Order Id"}
                  classes={classes}
                />
                <TextWrap
                  info={order.createdAt.substring(0, 10)}
                  title={"Order Date"}
                  classes={classes}
                />
                <TextWrap
                  info={`$${order.totalPrice}.00`}
                  title={"Order Price"}
                  classes={classes}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.infoCard}>
                <Title text={"Shipping Details"} />

                <TextWrap
                  classes={classes}
                  info={order.shippingAddress.name}
                  title={"Name"}
                />

                <TextWrap
                  classes={classes}
                  info={order.shippingAddress.mobile}
                  title={"Phone "}
                />

                <TextWrap
                  classes={classes}
                  info={order.shippingAddress.address}
                  title={"Address"}
                />
                <TextWrap
                  classes={classes}
                  info={order.shippingAddress.postalCode}
                  title={"Postal Code"}
                />

                {order.isPaid && !order.isDelivered ? (
                  <Alert variant="filled" severity="info">
                    We are Procesing your Order
                  </Alert>
                ) : !order.isDelivered ? (
                  <Alert variant="filled" severity="warning">
                    Not Yet Delivered! Make Payment to Process Your Order
                  </Alert>
                ) : (
                  <Alert variant="filled" severity="success">
                    Delivered
                  </Alert>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.infoCard}>
                <Title text={"Payment Method"} />
                <TextWrap
                  classes={classes}
                  info={order.paymentMethod}
                  title="Payment Mode"
                />
                {!order.isPaid ? (
                  <Alert variant="filled" severity="info">
                    Pending
                  </Alert>
                ) : (
                  <Alert variant="filled" severity="success">
                    Paid
                  </Alert>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.infoCard}>
                <Title text={"Order Items"} />
                {order.orderItems.map((item) => (
                  <LgCart
                    item={item}
                    key={item._id}
                    qty={false}
                    trashbtn={false}
                  />
                ))}
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Paper className={classes.price}>
              <List>
                <ListItem>
                  <ListItemText primary={"PRICE DETAILS"} />
                </ListItem>

                <Divider />
                <ListItem>
                  <ListItemText
                    primary={`Price (${order.orderItems.length}Items)`}
                  />
                  <ListItemText
                    style={{ textAlign: "right" }}
                    primary={`$${order.itemsPrice}.00`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Convenience Fee:`} />
                  <ListItemText
                    style={{ textAlign: "right" }}
                    primary={`$${order.shippingPrice}.00`}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary={`Total Payable Amount: `} />
                  <ListItemText
                    style={{ textAlign: "right" }}
                    primary={` $${order.totalPrice}.00 `}
                  />
                </ListItem>
                <ListItem>
                  {!order.isPaid && (
                    <Box width="100%">
                      {!sdkReday ? (
                        <CircularProgress size="small" />
                      ) : (
                        <React.Fragment>
                          {errorPay && (
                            <div className="alert alert-danger">{errorPay}</div>
                          )}
                          {loadingPay && <CircularProgress size="small" />}
                          <PayPalButton
                            style={{
                              color: "blue",
                              shape: "pill",
                              height: 40,
                              width: "100%",
                            }}
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                          />
                        </React.Fragment>
                      )}
                    </Box>
                  )}
                  {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <React.Fragment>
                      {errorDeliver && (
                        <div className="alert alert-danger">{errorDeliver}</div>
                      )}
                      {loadingDeliver && <Loading />}
                      <Button
                        variant="contained"
                        fullWidth
                        color="primary"
                        onClick={deliverHandler}
                      >
                        Mark As Delivered
                      </Button>
                    </React.Fragment>
                  )}
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default OrderDetails;

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
