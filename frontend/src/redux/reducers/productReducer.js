import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCESS,
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAILED,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_FAILED,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAILED,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAILED,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAILED,
  PRODUCT_MEN_REQUEST,
  PRODUCT_MEN_SUCCESS,
  PRODUCT_MEN_FAILED,
  PRODUCT_WOMEN_REQUEST,
  PRODUCT_WOMEN_SUCCESS,
  PRODUCT_WOMEN_FAILED,
  PRODUCT_KIDS_REQUEST,
  PRODUCT_KIDS_SUCCESS,
  PRODUCT_KIDS_FAILED,
} from "../types/productType";

//PRODUCT  REDUCER
const initialState = {
  loading: false,
  products: [],
  error: "",
};
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };

    case PRODUCT_LIST_SUCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.data.products,
        count: action.payload.results,
        total: action.payload.total,
      };

    case PRODUCT_LIST_FAILED:
      return { loading: false, products: [], error: action.payload };

    default:
      return state;
  }
};

//PRODUCT DEATILS REDUCER
const initialDetails = {
  loading: true,
  product: {},
  error: "",
};
export const productDetailsReducer = (state = initialDetails, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };

    case PRODUCT_DETAILS_SUCESS:
      return { ...state, loading: false, product: action.payload };

    case PRODUCT_DETAILS_FAILED:
      return { loading: false, product: {}, error: action.payload };

    default:
      return state;
  }
};

//PRODUCT DEATILS REDUCER

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };

    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_DELETE_FAILED:
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

//PRODUCT CREATE REDUCER

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };

    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };

    case PRODUCT_CREATE_FAILED:
      return { loading: false, success: false, error: action.payload };

    case PRODUCT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};
//PRODUCT UPDATE REDUCER

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };

    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };

    case PRODUCT_UPDATE_FAILED:
      return { loading: false, success: false, error: action.payload };

    case PRODUCT_UPDATE_RESET:
      return { product: {} };

    default:
      return state;
  }
};
//PRODUCT CREATE REVIEW REDUCER
export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };

    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_CREATE_REVIEW_FAILED:
      return { loading: false, success: false, error: action.payload };

    case PRODUCT_CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};
//GET PRODUCT TOP RATED REDUCER
export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true };

    case PRODUCT_TOP_SUCCESS:
      return { loading: false, success: true, products: action.payload };

    case PRODUCT_TOP_FAILED:
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};
//GET MEN PRODUCTS REDUCER
export const productMenReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_MEN_REQUEST:
      return { loading: true };

    case PRODUCT_MEN_SUCCESS:
      return { loading: false, success: true, products: action.payload };

    case PRODUCT_MEN_FAILED:
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};
//GET WOMEN PRODUCTS REDUCER
export const productWoMenReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_WOMEN_REQUEST:
      return { loading: true };

    case PRODUCT_WOMEN_SUCCESS:
      return { loading: false, success: true, products: action.payload };

    case PRODUCT_WOMEN_FAILED:
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};
//GET KIDS PRODUCTS REDUCER
export const productKidsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_KIDS_REQUEST:
      return { loading: true };

    case PRODUCT_KIDS_SUCCESS:
      return { loading: false, success: true, products: action.payload };

    case PRODUCT_KIDS_FAILED:
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};
