import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartAction, cartRemove } from "../../redux/actions/cartAction";
import EmptyCart from "../../components/emptyPages/EmptyCart";
import LgCart from "./LgCart";
import MobileCart from "./MobileCart";
import { Header } from "../../components/index";
import {
  Container,
  Grid,
  Box,
  Button,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import useStyles from "./styles";

const CartScreen = ({ match, history }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();
  const classes = useStyles();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const price = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const convenienceFee = price < 200 ? 10 : 0;
  const totalPrice = price + convenienceFee;

  useEffect(() => {
    productId && dispatch(cartAction(productId));
  }, [productId, dispatch]);

  const placeOrder = () => {
    history.push("/signIn?redirect=shipping");
  };

  const removeHandler = (id) => {
    dispatch(cartRemove(id));
  };

  return (
    <Box>
      <Header history={history} />
      <Box mt={12} />

      {cartItems.length <= 0 ? (
        <EmptyCart />
      ) : (
        <Container xs={12}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12}>
                <Box my={5} style={{ textAlign: "center" }}>
                  <Typography variant="h4">Shopping Cart</Typography>
                </Box>
              </Grid> */}
            {/* <Grid item xs={12}>
              <Box my={3}>
                <Typography variant="h6">
                  Cart({cartItems.length} Items)
                </Typography>
              </Box>
            </Grid> */}

            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
              <Paper>
                {cartItems.map((item) => (
                  <LgCart
                    item={item}
                    key={item._id}
                    removeHandler={removeHandler}
                    cartItems={cartItems}
                  />
                ))}
              </Paper>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Paper className={classes.priceCard}>
                <List>
                  <ListItem>
                    <ListItemText primary={"Price Details"} />
                  </ListItem>

                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary={`Price (${cartItems.length}Items): `}
                    />
                    <ListItemText
                      style={{ textAlign: "right" }}
                      primary={`$${price}.00`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Convenience Fee:`} />
                    <ListItemText
                      style={{ textAlign: "right" }}
                      primary={`$${convenienceFee}.00 `}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary={`Total Fees: `} />
                    <ListItemText
                      style={{ textAlign: "right" }}
                      primary={` $${totalPrice}.00 `}
                    />
                  </ListItem>
                  <ListItem>
                    <Button
                      onClick={placeOrder}
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Place Order
                    </Button>
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )}
    </Box>
  );
};

export default CartScreen;
