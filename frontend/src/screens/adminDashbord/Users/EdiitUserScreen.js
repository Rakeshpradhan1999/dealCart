import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../../../components";
import { detailsUser, updateUser } from "../../../redux/actions/userActions";
import { USER_ADMIN_UPDATE_RESET } from "../../../redux/types/userTypes";
import FormWrapper from "../FormWrapper";
import {
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
const EdiitUserScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success, loading: userLoading, error: userError } = userUpdate;

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_ADMIN_UPDATE_RESET });
      history.push("/adminDash/users");
    } else {
      if (!user || user._id !== userId) {
        dispatch(detailsUser(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, userId, dispatch, success, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return loading || userLoading ? (
    <Loading />
  ) : (
    <FormWrapper
      btntxt={"Users"}
      title={"Update User"}
      link={"/adminDash/users"}
    >
      <form action="" onSubmit={handleSubmit}>
        <Grid container style={{ width: "100%" }} spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Name"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  color="primary"
                />
              }
              label="Admin"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              color="primary"
              type="submit"
            >
              Save User
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormWrapper>
  );
};
export default EdiitUserScreen;
