import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
	CART_EMPTY
} from '../types/cartTypes';

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;
			const existItem = state.cartItems.find((p) => p._id === item._id);

			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((p) => (p._id === existItem._id ? item : p))
				};
			} else {
				return {
					...state,
					cartItems: [ ...state.cartItems, item ]
				};
			}
		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter((item) => item._id !== action.payload)
			};
		case CART_SAVE_SHIPPING_ADDRESS:
			return { ...state, shippingAddress: action.payload };
		case CART_SAVE_PAYMENT_METHOD:
			return { ...state, paymentMethod: action.payload };
		case CART_EMPTY:
			return { ...state, cartItems: [] };
		default:
			return state;
	}
};
