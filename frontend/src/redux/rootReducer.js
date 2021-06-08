import {combineReducers} from 'redux';
import {cartReducer} from './reducers/cartReducer';
import {
  productCreateReducer,
  productCreateReviewReducer,
  productDeleteReducer,
  productDetailsReducer,
  productKidsReducer,
  productMenReducer,
  productReducer,
  productTopRatedReducer,
  productUpdateReducer,
  productWoMenReducer,
} from './reducers/productReducer';
import {
  forgotPasswordReducer,
  resetPasswordReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSignInReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './reducers/userReduer';
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
} from './reducers/orderCreateReducer';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getSubCategories,
  updateCategory,
} from './reducers/categoryReducer';

const rootReducer = combineReducers ({
  productList: productReducer,
  productDetails: productDetailsReducer,
  deletProduct: productDeleteReducer,
  createProduct: productCreateReducer,
  updateProduct: productUpdateReducer,
  createReview: productCreateReviewReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderMineList: orderMineListReducer,
  orderList: orderListReducer,
  userSignin: userSignInReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateDetails: userUpdateProfileReducer,
  listUsers: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  topRatedProductList: productTopRatedReducer,
  kidsProductList: productKidsReducer,
  menProductList: productMenReducer,
  woMenProductList: productWoMenReducer,
  categoryList: getCategories,
  createCate: createCategory,
  updateCate: updateCategory,
  deleteCate: deleteCategory,
  subCategoryList: getSubCategories,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
});

export default rootReducer;
