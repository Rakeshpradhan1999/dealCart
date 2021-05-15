import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../redux/actions/userActions";
import Form from "../../components/form/Form";
import { Header } from "../../components/index";

const Login = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    userInfo && history.push(redirect);
  }, [userInfo, history, redirect]);
  const formData = {
    title: "Hello! let's get started",
    subTitle: "Sign in to continue.",
    formHandler: loginHandler,
    error: error,
    btnTxt: "Login",
    bottomTxt: 'Haven"t an Account ?',
    linkTxt: "Create a new Account",
    link: "register",
    redirect: redirect,
    loading,

    input: [
      {
        label: "Email Address",
        type: "email",
        name: "email",
        placeholder: "Enter your Email",
        value: email,
        setData: setEmail,
      },
      {
        label: "Password",
        type: "password",
        name: "password",
        placeholder: "Enter your password",
        value: password,
        setData: setPassword,
      },
    ],
  };

  return (
    <div>
      <Header history={history} />

      <Form formData={formData} />
    </div>
  );
};

export default Login;
