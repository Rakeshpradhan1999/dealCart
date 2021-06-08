import React, {useState, useEffect} from 'react';
import {
  TextField,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';
import {ToastContainer, toast} from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {forgotPassword} from '../../redux/actions/userActions';

const useStyle = makeStyles (theme => ({
  main: {
    width: '100vp',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url(/images/Forgotpassword.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  root: {
    width: '100%',
    textAlign: 'center',
    maxWidth: '400px',
    padding: theme.spacing (4, 6),
  },
  btn: {
    marginTop: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  space: {
    margin: theme.spacing (1.5, 0),
  },
}));

const ForgotPassword = () => {
  const classes = useStyle ();
  const [email, setEmail] = useState ('');
  const dispatch = useDispatch ();

  const {loading, error, success} = useSelector (state => state.forgotPassword);

  //handlechange
  const handlechange = e => {
    setEmail (e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault ();
    dispatch (forgotPassword (email));
    setEmail ('');
  };

  useEffect (
    () => {
      if (error) {
        toast.error (error.response.data.error);
      }
      if (success) {
        toast.success ('Link sent successfully! Check Your Email');
      }
    },
    [error, success]
  );

  return (
    <div className={classes.main}>

      <Paper className={classes.root}>
        <ToastContainer position="top-right" />
        <Typography variant="h6" className={classes.title}>
          Forgot Your Password?
        </Typography>
        <br />

        <Typography variant="caption">
          Enter Your email address and we'll

          <br />

          send you a link to reset your password.
        </Typography>
        <form action="" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            fullWidth
            label="Email Address"
            size="small"
            className={classes.space}
            value={email}
            onChange={handlechange}
            type="email"
          />

          <Button
            variant="contained"
            className={classes.btn}
            color="primary"
            fullWidth
            type="submit"
          >
            {loading ? <CircularProgress color="secondary" /> : 'Send link'}
          </Button>
        </form>

      </Paper>
    </div>
  );
};

export default ForgotPassword;
