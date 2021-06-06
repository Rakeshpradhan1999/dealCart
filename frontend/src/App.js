import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Header, Products } from "./components";
import { CssBaseline } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import { ProductScreen } from "./screens";
import CartScreen from "./screens/cartScreen/CartScreen";
import Login from "./screens/login/Login";
import Register from "./screens/register/Register";
import AddressForm from "./screens/checkOut/AddressForm";
import PaymentScreen from "./screens/checkOut/PaymentScreen";
import OrderSummary from "./screens/checkOut/OrderSummary";
import OrderDetails from "./screens/orderDetailsScreen/OrderDetails";
import OrderHistoryScreen from "./screens/orderHistory/OrderHistoryScreen";
import Privateroute from "./components/Privateroute";
import MyAccount from "./screens/userProfile/MyAccount";

import UserForm from "./screens/userProfile/UserForm";
import AdminHome from "./screens/adminDashbord/AdminHome";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";
import Home from "./screens/homeScreen/Home";
import { Meta } from "./components/index";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/products" exact component={Products} />
        <Route path="/page/:pageNumber" component={Products} exact />
        <Route path="/search/:keyword" component={Products} exact />
        <Route path="/search/:keyword/page/:pageNumber" component={Products} />
        <Route path="/signin" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/shipping" exact component={AddressForm} />
        <Route path="/payment" exact component={PaymentScreen} />
        <Route path="/ordersummary" exact component={OrderSummary} />
        <Route path="/order/:id" component={OrderDetails} />
        <Route path="/products/:id" component={ProductScreen} />
        <Privateroute path="/myorders" component={OrderHistoryScreen} />
        <Privateroute path="/adminDash" component={AdminHome} />
        <Privateroute path="/myaccount/profile" component={UserForm} />
        <Privateroute path="/myaccount" component={MyAccount} />
        <Route path="/cart/:id?" component={CartScreen} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
