import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../redux/actions/cartAction";
import CheckOutSteeper from "./CheckOutSteeper";
import PriceDetail from "../../components/priceDetails/PriceDetail";
import { Header, Title } from "../../components/index";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  Box,
} from "@material-ui/core";
import useStyles from "./styles";

const AddressForm = ({ history }) => {
  const userSignin = useSelector((state) => state.userSignin);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { userInfo } = userSignin;
  if (!userInfo) {
    history.push("/signin");
  }
  const [name, setName] = useState(shippingAddress.name);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [mobile, setMobile] = useState(shippingAddress.mobile);
  const [city, setCity] = useState(shippingAddress.city);
  const [address, setAddress] = useState(shippingAddress.address);
  const [country, setCountry] = useState(shippingAddress.country);
  const [locality, setLocality] = useState(shippingAddress.locality);
  const classes = useStyles();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        name,
        postalCode,
        mobile,
        city,
        address,
        country,
        locality,
      })
    );

    history.push("/payment");
  };

  const formData = {
    input: [
      {
        type: "text",
        name: "name",
        value: name,
        setValue: setName,
        label: "Full Name",
        placeholder: "Enter your Name",
      },
      {
        type: "number",
        name: "mobile",
        value: mobile,
        setValue: setMobile,
        label: "Phone no",
        placeholder: "Enter 10 digit Phone Number",
      },
      {
        type: "text",
        name: "postalcode",
        value: postalCode,
        setValue: setPostalCode,
        label: "Postalcode",
        placeholder: "Enter your pincode",
      },
      {
        type: "locality",
        name: "locality",
        value: locality,
        setValue: setLocality,
        label: "Locality",
        placeholder: "Locality",
      },
      {
        type: "text",
        name: "city",
        value: city,
        setValue: setCity,
        label: "City",
        placeholder: "City",
      },
      {
        type: "text",
        name: "country",
        value: country,
        setValue: setCountry,
        label: "Country",
        placeholder: "Country",
      },
    ],
  };

  return (
    <>
      <Header history={history} />
      <Box mt={12} />

      <Container xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <CheckOutSteeper activeStep={1} />
          </Grid>
        </Grid>
        <form onSubmit={submitHandler}>
          <Grid container style={{ width: "100%" }} spacing={3}>
            <Grid container item xs={8}>
              <Paper className={classes.infoCard}>
                <Title text="Address Details" />
                <Grid container item xs={12} spacing={2}>
                  {formData.input.map((input, i) => (
                    <Grid item xs={12} sm={12} md={6} key={i}>
                      <TextField
                        type={input.type}
                        name={input.name}
                        value={input.value}
                        onChange={(e) => input.setValue(e.target.value)}
                        placeholder={input.placeholder}
                        label={input.label}
                        required
                        variant={"outlined"}
                        fullWidth
                      />
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={"Address"}
                      label={"Address"}
                      required
                      variant={"outlined"}
                      fullWidth
                      multiline
                      rows={4}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
              <PriceDetail btn formHandle={submitHandler} />
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default AddressForm;
