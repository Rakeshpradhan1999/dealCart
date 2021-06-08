import axios from 'axios';
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_FAIL,
  USER_DELETE_SUCCESS,
  USER_ADMIN_UPDATE_REQUEST,
  USER_ADMIN_UPDATE_SUCCESS,
  USER_ADMIN_UPDATE_FAIL,
  PASSWORD_FORGOT_REQUEST,
  PASSWORD_FORGOT_SUCCESS,
  PASSWORD_FORGOT_FAIL,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
} from '../types/userTypes';

export const register = (name, email, password) => async dispatch => {
  dispatch ({type: USER_REGISTER_REQUEST, payload: {email, password}});

  try {
    const {data} = await axios.post ('/api/users/register', {
      name,
      email,
      password,
    });
    dispatch ({type: USER_REGISTER_SUCCESS, payload: data});

    dispatch ({type: USER_SIGNIN_SUCCESS, payload: data});

    localStorage.setItem ('userInfo', JSON.stringify (data));
  } catch (error) {
    dispatch ({
      type: USER_REGISTER_FAIL,
      payload: error,
    });
  }
};
export const signin = (email, password) => async dispatch => {
  dispatch ({type: USER_SIGNIN_REQUEST, payload: {email, password}});

  try {
    const {data} = await axios.post ('/api/users/signin', {email, password});
    dispatch ({type: USER_SIGNIN_SUCCESS, payload: data});
    localStorage.setItem ('userInfo', JSON.stringify (data));
  } catch (error) {
    dispatch ({
      type: USER_SIGNIN_FAIL,
      payload: error,
    });
  }
};

export const signout = () => dispatch => {
  localStorage.removeItem ('userInfo');
  localStorage.removeItem ('cartItems');
  localStorage.removeItem ('shippingAddress');
  dispatch ({type: USER_SIGNOUT});
};

export const detailsUser = userId => async (dispatch, getState) => {
  dispatch ({type: USER_DETAILS_REQUEST});
  const {userSignin: {userInfo}} = getState ();
  try {
    const {data} = await axios.get (`/api/users/${userId}`, {
      headers: {Authorization: `Bearer ${userInfo.token}`},
    });
    dispatch ({type: USER_DETAILS_SUCCESS, payload: data});
  } catch (error) {
    dispatch ({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const updateUserDetails = user => async (dispatch, getState) => {
  dispatch ({type: USER_UPDATE_REQUEST, payload: user});
  const {userSignin: {userInfo}} = getState ();

  try {
    const {data} = await axios.put (`/api/users/profile`, user, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch ({type: USER_UPDATE_SUCCESS, payload: data});
    dispatch ({type: USER_SIGNIN_SUCCESS, payload: data});
    localStorage.setItem ('userInfo', JSON.stringify (data));
  } catch (error) {
    dispatch ({
      type: USER_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const usersList = (page, limit) => async (dispatch, getState) => {
  dispatch ({type: USER_LIST_REQUEST});
  const {userSignin: {userInfo}} = getState ();

  try {
    const {data} = await axios.get (`/api/users/?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch ({type: USER_LIST_SUCCESS, payload: data});
  } catch (error) {
    dispatch ({
      type: USER_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const deleteUser = id => async (dispatch, getState) => {
  dispatch ({type: USER_DELETE_REQUEST});
  const {userSignin: {userInfo}} = getState ();

  try {
    await axios.delete (`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch ({type: USER_DELETE_SUCCESS});
  } catch (error) {
    dispatch ({
      type: USER_DELETE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const updateUser = user => async (dispatch, getState) => {
  dispatch ({type: USER_ADMIN_UPDATE_REQUEST});
  const {userSignin: {userInfo}} = getState ();

  try {
    const {data} = await axios.put (`/api/users/${user._id}`, user, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch ({type: USER_ADMIN_UPDATE_SUCCESS});
    dispatch ({type: USER_DETAILS_SUCCESS, payload: data});
  } catch (error) {
    dispatch ({
      type: USER_ADMIN_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const forgotPassword = email => async (dispatch, state) => {
  dispatch ({type: PASSWORD_FORGOT_REQUEST});
  try {
    const {data} = await axios.post (
      '/api/users/forgot_password',
      {email},
      {headers: {'Content-Type': 'application/json'}}
    );
    dispatch ({type: PASSWORD_FORGOT_SUCCESS, payload: data});
  } catch (error) {
    dispatch ({type: PASSWORD_FORGOT_FAIL, payload: error});
  }
};

export const resetPassword = update => async (dispatch, state) => {
  dispatch ({type: PASSWORD_RESET_REQUEST});

  try {
    const {data} = await axios.post ('/api/users/reset_password', update, {
      headers: {'Content-Type': 'application/json'},
    });
    dispatch ({type: PASSWORD_RESET_SUCCESS, payload: data});
    console.log (data);
  } catch (error) {
    dispatch ({type: PASSWORD_RESET_FAIL, payload: error});
  }
};
