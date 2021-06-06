import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";

import {
  detailsUser,
  updateUserDetails,
} from "../../redux/actions/userActions";
import { USER_PROFILE_RESET } from "../../redux/types/userTypes";
import { Loading, Header, Title, Footer } from "../../components/index";
import {
  Container,
  Grid,
  TextField,
  Button,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
const MyAccount = (props) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;
  const userUpdateDetails = useSelector((state) => state.userUpdateDetails);
  const {
    success,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateDetails;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password and confirm Password dont match");
    } else {
      dispatch(
        updateUserDetails({
          userId: user._id,
          name,
          email,
          password,
          gender,
          mobile,
        })
      );
    }
  };
  useEffect(() => {
    if (!user || success) {
      dispatch({ type: USER_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setGender(user.gender);
      if (user.mobile !== "") {
        setMobile(user.mobile);
      }
    }
  }, [dispatch, user, userInfo, success]);

  return (
    <>
      <Header history={props.history} />
      <div style={{ marginTop: "100px" }} />
      {loading || loadingUpdate ? (
        <Loading />
      ) : (
        <Container xs={12}>
          <Grid container justify="center">
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Paper className={classes.infoCard}>
                <form action="" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Title text="Update Your Informations" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant={"outlined"}
                        fullWidth
                        label="Full Name"
                        value={name}
                        placeholder="Full Name"
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        variant={"outlined"}
                        fullWidth
                        label="Email"
                        value={email}
                        placeholder="Email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant={"outlined"}
                        required
                        fullWidth
                        label="Phone"
                        value={mobile}
                        placeholder="Phone"
                        type="text"
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <TextField
                        variant={"outlined"}
                        required
                        fullWidth
                        label="Password"
                        value={password}
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <TextField
                        variant={"outlined"}
                        fullWidth
                        required
                        label="Confirm Password"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                          aria-label="Gender"
                          name="gender"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <FormControlLabel
                            control={<Radio color="primary" />}
                            label="Male"
                            value={"Male"}
                          />
                          <FormControlLabel
                            control={<Radio color="primary" />}
                            label="Female"
                            value={"Female"}
                          />
                          <FormControlLabel
                            control={<Radio color="primary" />}
                            label="Other"
                            value={"Other"}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      color="primary"
                      variant="contained"
                      size="large"
                    >
                      Save Profile
                    </Button>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )}
      <Footer />
    </>
  );
};

export default MyAccount;
