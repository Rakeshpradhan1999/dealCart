import axios from 'axios';
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD
} from '../types/cartTypes';

//Cart Add Action
export const cartAction = (productId, qty = 1) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${productId}`);

	dispatch({
		type: CART_ADD_ITEM,
		payload: { ...data, qty, product: data._id }
	});

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

//Cart Remove Action
export const cartRemove = (productId) => async (dispatch, getState) => {
	dispatch({ type: CART_REMOVE_ITEM, payload: productId });
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

//ShippingAddress save Actions

export const saveShippingAddress = (data) => (dispatch) => {
	dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });

	localStorage.setItem('shippingAddress', JSON.stringify(data));
};

//savePaymentMethod

export const savePaymentMethod = (data) => (dispatch) => {
	dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
