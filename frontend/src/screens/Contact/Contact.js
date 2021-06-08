import React, {useEffect, useState} from 'react';
import {
  TextField,
  Paper,
  Box,
  Grid,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import Layout from '../../components/Layout/Layout';
import {makeStyles} from '@material-ui/core/styles';
import {FiMapPin, FiPhone} from 'react-icons/fi';
import {HiOutlineMail} from 'react-icons/hi';
import axios from 'axios';

import {ToastContainer, toast} from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles (theme => ({
  root: {
    textAlign: 'center',
    '& .MuiContantainer-root': {
      backgroundColor: theme.palette.primary.main,
    },
  },

  title: {
    fontWeight: 'bold',
  },
  card: {
    padding: theme.spacing (4, 2),
  },
  list: {
    '& .MuiListItemIcon-root': {
      fontSize: '20px',
      color: theme.palette.primary.main,
    },
  },
}));

const Contact = () => {
  const [values, setvalues] = useState ({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
  });

  const changeHandler = e => {
    setvalues ({...values, [e.target.name]: e.target.value});
  };

  const {name, email, mobile, subject, message} = values;
  const submitHandler = async e => {
    e.preventDefault ();
    try {
      const {data} = await axios.post ('/api/contact', {
        name,
        email,
        mobile,
        subject,
        message,
      });
      if (data) {
        toast.success ('Your message sent successfully!');
      }
      setvalues ({name: '', email: '', mobile: '', subject: '', message: ''});
    } catch (error) {
      toast.error (error.response.data.error);
    }
  };

  const classes = useStyles ();

  return (
    <main className={classes.main}>
      <ToastContainer position="top-right" />

      <Layout
        title="Contact Us"
        caption="If you need anything, we are just a buzz away"
      >

        <Box mt={10}>
          <Grid container item xs={12} spacing={2}>
            <Grid container item xs={12} md={8}>

              <Paper className={classes.card}>
                <form action="" onSubmit={submitHandler}>

                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="name"
                        required
                        label="Name"
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={changeHandler}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="email"
                        required
                        label="Email"
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={changeHandler}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="phone"
                        required
                        label="Phone"
                        type="number"
                        name="mobile"
                        value={values.mobile}
                        onChange={changeHandler}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        id="subject"
                        required
                        label="Subject"
                        type="text"
                        name="subject"
                        value={values.subject}
                        onChange={changeHandler}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={6}
                        rowsMax={10}
                        placeholder="Write Your Message Here .."
                        label="Message"
                        variant="outlined"
                        type="text"
                        name="message"
                        value={values.message}
                        onChange={changeHandler}
                      />

                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" color="primary" type="submit">
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
            <Grid container item xs={4}>
              <Grid item xs={12}>
                <Paper className={classes.card}>
                  <List className={classes.list}>
                    <ListItem>
                      <ListItemIcon>
                        <FiMapPin />
                      </ListItemIcon>
                      <ListItemText primary="99, Xyz society, surat, Gujarat," />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FiPhone />
                      </ListItemIcon>
                      <ListItemText
                        primary="9992127211"
                        secondary="9298492814"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <HiOutlineMail />
                      </ListItemIcon>
                      <ListItemText
                        primary="dealcartInfo@email.com"
                        secondary="dealinfo@gmail.com"
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

        </Box>
      </Layout>
    </main>
  );
};

export default Contact;
