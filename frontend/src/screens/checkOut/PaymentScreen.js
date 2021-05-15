import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Header, Title } from "../../components";
import { savePaymentMethod } from "../../redux/actions/cartAction";
import CheckOutSteeper from "./CheckOutSteeper";
import {
  Container,
  Grid,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  Button,
  Box,
} from "@material-ui/core";
import useStyles from "./styles";

const PaymentScreen = ({ history }) => {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const [paymentMode, setPaymentMode] = useState("Paypal");
  const dispatch = useDispatch();

  const paymentHandler = (e) => {
    e.preventDefault();
    setPaymentMode(e.target.value);
    dispatch(savePaymentMethod(paymentMode));
    history.push("/ordersummary");
  };

  return (
    <>
      <Header history={history} />
      <Box mt={12} />

      <Container xs={12}>
        <CheckOutSteeper activeStep={2} />
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <Paper className={classes.infoCard}>
              <Title text={"Payment Method"} />
              <form action="" onSubmit={paymentHandler}>
                <FormControl component={"fieldset"}>
                  <RadioGroup
                    aria-label={"payment"}
                    name="payment"
                    value={paymentMode}
                    onChange={paymentHandler}
                  >
                    <FormControlLabel
                      value="Paypal"
                      control={<Radio color="primary" />}
                      label="Paypal"
                    />
                    <FormControlLabel
                      value="Stripe"
                      control={<Radio color="primary" />}
                      label="Stripe"
                      disabled
                    />
                    <FormControlLabel
                      value="Cash On Delivery"
                      control={<Radio color="primary" />}
                      label="Cash On Delivery"
                      disabled
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                <Box mt={2}>
                  <Button
                    color="primary"
                    style={{ width: "16ch" }}
                    type="submit"
                    variant="contained"
                  >
                    Continue
                  </Button>
                </Box>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PaymentScreen;
