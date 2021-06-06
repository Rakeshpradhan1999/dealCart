import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../../redux/actions/userActions';
import Form from '../../components/form/Form';
import {Header} from '../../components/index';
import {ToastContainer, toast} from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

const Register = ({location, history}) => {
  const [name, setName] = useState ('');
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [confirmPassword, setConfirmPassword] = useState ('');
  const dispatch = useDispatch ();

  const userRegister = useSelector (state => state.userRegister);
  const {userInfo, loading, error, success} = userRegister;
  userInfo && console.log (userInfo);

  const redirect = location.search ? location.search.split ('=')[1] : '/';

  const registerHandler = e => {
    e.preventDefault ();
    password !== confirmPassword
      ? toast.error ('password and confirmPassword Doesn"t match')
      : dispatch (register (name, email, password));
  };

  useEffect (
    () => {
      userInfo && history.push (redirect);
      if (error) {
        toast.error (error.response.data.error);
      }
    },
    [userInfo, history, redirect, error]
  );
  const formData = {
    title: 'New Here ?',
    subTitle: 'Signing up is easy. It only takes a few steps',
    formHandler: registerHandler,
    error: error,
    btnTxt: 'SingUp',
    bottomTxt: 'Allready have an Account?',
    linkTxt: 'SignIn',
    link: 'signin',
    redirect: redirect,
    loading,
    input: [
      {
        label: 'Name',
        type: 'text',
        name: 'name',
        value: name,
        placeholder: 'Enter your Name',
        setData: setName,
      },
      {
        label: 'Email Address',
        type: 'email',
        name: 'email',
        value: email,
        placeholder: 'Enter your Email',
        setData: setEmail,
      },
      {
        label: 'Password',
        type: 'password',
        name: 'password',
        value: password,
        placeholder: 'Enter your password',
        setData: setPassword,
      },
      {
        label: 'Confirm Password',
        type: 'password',
        name: 'password',
        value: confirmPassword,
        placeholder: 'Enter your password',
        setData: setConfirmPassword,
      },
    ],
  };

  return (
    <div>
      <Header history={history} />
      <ToastContainer position="top-right" />

      <Form formData={formData} />
    </div>
  );
};

export default Register;
