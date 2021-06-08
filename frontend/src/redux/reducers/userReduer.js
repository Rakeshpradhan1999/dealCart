import {
  USER_ADMIN_UPDATE_FAIL,
  USER_ADMIN_UPDATE_REQUEST,
  USER_ADMIN_UPDATE_SUCCESS,
  USER_ADMIN_UPDATE_RESET,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_PROFILE_RESET,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  PASSWORD_FORGOT_REQUEST,
  PASSWORD_FORGOT_SUCCESS,
  PASSWORD_FORGOT_FAIL,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
} from '../types/userTypes';

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {loading: true};
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        success: true,
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userSignInReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return {loading: true};
    case USER_SIGNIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_SIGNIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};
export const userDetailsReducer = (state = {loading: {}}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {loading: true};
    case USER_DETAILS_SUCCESS:
      return {loading: false, user: action.payload};
    case USER_DETAILS_FAIL:
      return {loading: false, error: action.payload};

    default:
      return state;
  }
};
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {loading: true};
    case USER_UPDATE_SUCCESS:
      return {loading: false, success: true};
    case USER_UPDATE_FAIL:
      return {loading: false, error: action.payload, success: false};
    case USER_PROFILE_RESET:
      return {};

    default:
      return state;
  }
};

export const userListReducer = (state = {loading: true, users: []}, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {loading: true};
    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload.data.users,
        total: action.payload.total,
        count: action.payload.results,
      };
    case USER_LIST_FAIL:
      return {loading: false, error: action.payload, users: []};
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {loading: true}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {loading: true};
    case USER_DELETE_SUCCESS:
      return {loading: false, success: true};
    case USER_DELETE_FAIL:
      return {loading: false, error: action.payload, success: false};
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {user: {}}, action) => {
  switch (action.type) {
    case USER_ADMIN_UPDATE_REQUEST:
      return {loading: true};
    case USER_ADMIN_UPDATE_SUCCESS:
      return {loading: false, success: true};
    case USER_ADMIN_UPDATE_FAIL:
      return {loading: false, error: action.payload, success: false};

    case USER_ADMIN_UPDATE_RESET:
      return {
        user: {},
      };

    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case PASSWORD_FORGOT_REQUEST:
      return {loading: true};
    case PASSWORD_FORGOT_SUCCESS:
      return {loading: false, success: true, message: action.payload};
    case PASSWORD_FORGOT_FAIL:
      return {loading: false, error: action.payload, success: false};
    default:
      return state;
  }
};

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case PASSWORD_RESET_REQUEST:
      return {loading: true};
    case PASSWORD_RESET_SUCCESS:
      return {loading: false, success: true};
    case PASSWORD_RESET_FAIL:
      return {loading: false, error: action.payload, success: false};
    default:
      return state;
  }
};
