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
import {resetPassword} from '../../redux/actions/userActions';

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

const ResetPassword = ({match}) => {
  const token = match.params.token;
  const classes = useStyle ();
  const [values, setValues] = useState ({
    token: '',
    newPassword: '',
  });

  const dispatch = useDispatch ();

  const {loading, error, success} = useSelector (state => state.resetPassword);

  //handlechange
  const handlechange = e => {
    setValues ({...values, newPassword: e.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault ();
    dispatch (
      resetPassword ({
        newPassword: values.newPassword,
        resetPasswordLink: values.token,
      })
    );
    setValues ({newPassword: '', resetPasswordLink: ''});
  };

  useEffect (
    () => {
      if (token) {
        setValues ({...values, token: token});
      }
      if (error) {
        toast.error (error.response.data.error);
      }
      if (success) {
        toast.success ('Password Changed Successfully!');
      }
    },
    [error, success, token]
  );

  return (
    <div className={classes.main}>

      <Paper className={classes.root}>
        <ToastContainer position="top-right" />
        <Typography variant="h6" className={classes.title}>
          Reset Your Password
        </Typography>
        <br />

        <Typography variant="caption">
          Enter Your New Password
        </Typography>
        <form action="" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            fullWidth
            type="password"
            label="New Password"
            size="small"
            className={classes.space}
            value={values.newPassword}
            onChange={handlechange}
          />

          <Button
            variant="contained"
            className={classes.btn}
            color="primary"
            fullWidth
            type="submit"
          >
            {loading
              ? <CircularProgress color="secondary" />
              : 'Update Password'}
          </Button>
        </form>

      </Paper>
    </div>
  );
};

export default ResetPassword;
