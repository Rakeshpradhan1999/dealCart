import axios from 'axios';
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_GET_REQUEST,
  CATEGORY_GET_SUCCESS,
  CATEGORY_GET_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  SUBCATEGORY_GET_REQUEST,
  SUBCATEGORY_GET_SUCCESS,
  SUBCATEGORY_GET_FAIL,
  SUBCATEGORY_DELETE_REQUEST,
  SUBCATEGORY_DELETE_SUCCESS,
  SUBCATEGORY_DELETE_FAIL,
} from '../types/CategoryTypes';

//CREATE CATEGORY ACTION
export const createCategory = category => async (dispatch, getState) => {
  dispatch ({type: CATEGORY_CREATE_REQUEST});

  const {userSignin: {userInfo}} = getState ();

  try {
    const {data} = axios.post ('/api/category/create', category, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch ({type: CATEGORY_CREATE_SUCCESS, payload: data});
  } catch (error) {
    dispatch ({
      type: CATEGORY_CREATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

//UPDATE CATEGORY ACTION
export const updateCategory = category => async (dispatch, getState) => {
  dispatch ({type: CATEGORY_UPDATE_REQUEST});

  const {userSignin: {userInfo}} = getState ();

  try {
    const {data} = await axios.put (`/api/category/${category._id}`, category, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch ({type: CATEGORY_UPDATE_SUCCESS, payload: data});
  } catch (error) {
    dispatch ({
      type: CATEGORY_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

//DELETE CATEGORY ACTION
export const deleteCategory = cateId => async (dispatch, getState) => {
  dispatch ({type: CATEGORY_DELETE_REQUEST});

  const {userSignin: {userInfo}} = getState ();

  try {
    const {data} = await axios.delete (`/api/category/${cateId}`, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch ({type: CATEGORY_DELETE_SUCCESS, payload: data});
  } catch (error) {
    dispatch ({
      type: CATEGORY_DELETE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

//GET ALL CATEGORY ACTION
export const getCategories = (
  sortBy = '',
  limit = '',
  page = ''
) => async dispatch => {
  dispatch ({type: CATEGORY_GET_REQUEST});

  try {
    const {data} = await axios.get (
      `/api/category/parent?sort=${sortBy}&limit=${limit}&page=${page}`
    );
    dispatch ({type: CATEGORY_GET_SUCCESS, payload: data});
  } catch (error) {
    dispatch ({
      type: CATEGORY_GET_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

//GET ALL SUBCATEGORY ACTION
export const getSubCategories = (
  sortBy = '',
  limit = '',
  page = ''
) => async dispatch => {
  dispatch ({type: SUBCATEGORY_GET_REQUEST});

  try {
    const {data} = await axios.get (
      `/api/category/child?sort=${sortBy}&limit=${limit}&page=${page}`
    );
    dispatch ({type: SUBCATEGORY_GET_SUCCESS, payload: data});
  } catch (error) {
    dispatch ({
      type: SUBCATEGORY_GET_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

//DELETE SUB CATEGORY ACTION
export const deleteSubCategory = cateId => async (dispatch, getState) => {
  dispatch ({type: SUBCATEGORY_DELETE_REQUEST});

  const {userSignin: {userInfo}} = getState ();

  try {
    const {data} = await axios.delete (`/api/category/${cateId}`, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch ({type: SUBCATEGORY_DELETE_SUCCESS, payload: data});
  } catch (error) {
    dispatch ({
      type: SUBCATEGORY_DELETE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
