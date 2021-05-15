import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Button,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    // marginTop: theme.spacing(1),
  },
}));

const PriceDetail = ({ btn, formHandler, loading }) => {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const price = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const convenienceFee = price < 200 ? 10 : 0;
  const totalPrice = price + convenienceFee;

  return (
    <Paper className={classes.root}>
      <List>
        <ListItem>
          <ListItemText primary={"Price Details"} />
        </ListItem>

        <Divider />
        <ListItem>
          <ListItemText primary={`Price (${cartItems.length}Items): `} />
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
        {btn && (
          <ListItem>
            <Button
              onClick={formHandler}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Place Order
              {loading && <CircularProgress color="secondary" size="small" />}
            </Button>
          </ListItem>
        )}
      </List>
    </Paper>
  );
};

export default PriceDetail;
