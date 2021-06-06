import {
	PRODUCT_FILTER_LIST_REQUEST,
	PRODUCT_FILTER_LIST_SUCESS,
	PRODUCT_FILTER_LIST_FAILED,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCESS,
	PRODUCT_LIST_FAILED,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCESS,
	PRODUCT_DETAILS_FAILED,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAILED,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAILED,
	PRODUCT_UPDATE_FAILED,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_REVIEW_FAILED,
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
	PRODUCT_KIDS_FAILED
} from '../types/productType';
import axios from 'axios';
//PRODUCT ACTIONS
const productListRequest = () => {
	return {
		type: PRODUCT_LIST_REQUEST
	};
};
const productListSucess = (data) => {
	return {
		type: PRODUCT_LIST_SUCESS,
		payload: data
	};
};
const productListFailed = (error) => {
	return {
		type: PRODUCT_LIST_FAILED,
		payload: error
	};
};

export const listProducts = (sortBy = '', limit = '', page = '') => async (dispatch) => {
	dispatch(productListRequest());
	try {
		const { data } = await axios.get(`/api/products/?sort=${sortBy}&limit=${limit}&page=${page}`);
		dispatch(productListSucess(data));
	} catch (error) {
		dispatch(productListFailed(error));
	}
};

//PRODUCT DETAILS ACTION
const productDetailRequest = (productId) => {
	return {
		type: PRODUCT_DETAILS_REQUEST,
		payload: productId
	};
};
const productDetailsSucess = (data) => {
	return {
		type: PRODUCT_DETAILS_SUCESS,
		payload: data
	};
};
const productDetailsFailed = (error) => {
	return {
		type: PRODUCT_DETAILS_FAILED,
		payload: error.response && error.response.data.message ? error.response.data.message : error.message
	};
};

export const productDetailAction = (productId) => async (dispatch) => {
	dispatch(productDetailRequest(productId));

	try {
		const { data } = await axios.get(`/api/products/${productId}`);

		dispatch(productDetailsSucess(data));
	} catch (error) {
		dispatch(productDetailsFailed(error));
	}
};

//product delete Action

export const productDelete = (id) => async (dispatch, getState) => {
	dispatch({ type: PRODUCT_DELETE_REQUEST });
	const { userSignin: { userInfo } } = getState();

	try {
		await axios.delete(`/api/products/${id}`, {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		});
		dispatch({ type: PRODUCT_DELETE_SUCCESS });
	} catch (error) {
		dispatch({
			type: PRODUCT_DELETE_FAILED,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};
//product create Action

export const productCreate = () => async (dispatch, getState) => {
	dispatch({ type: PRODUCT_CREATE_REQUEST });
	const { userSignin: { userInfo } } = getState();

	try {
		const { data } = await axios.post(
			`/api/products`,
			{},
			{
				headers: {
					Authorization: `Bearer ${userInfo.token}`
				}
			}
		);
		dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_FAILED,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};

//PRODUCT UPDATE ACTION
export const productUpdate = (product) => async (dispatch, getState) => {
	dispatch({ type: PRODUCT_UPDATE_REQUEST });
	const { userSignin: { userInfo } } = getState();

	try {
		const { data } = await axios.put(`/api/products/${product._id}`, product, {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`
			}
		});

		dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_UPDATE_FAILED,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};
//PRODUCT CREATE REVIEW ACTION
export const productCreateReview = (productId, review) => async (dispatch, getState) => {
	dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });
	const { userSignin: { userInfo } } = getState();

	try {
		await axios.post(`/api/products/${productId}/reviews`, review, {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`
			}
		});

		dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_REVIEW_FAILED,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};
//GET TOP RATED PRODUCT 10
export const topRatedProducts = () => async (dispatch) => {
	dispatch({ type: PRODUCT_TOP_REQUEST });

	try {
		const { data } = await axios.get(`/api/products/top`);
		dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_TOP_FAILED,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};
//GET Men Products
export const menProducts = () => async (dispatch) => {
	dispatch({ type: PRODUCT_MEN_REQUEST });

	try {
		const { data } = await axios.get(`/api/products/men`);
		dispatch({ type: PRODUCT_MEN_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_MEN_FAILED,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};
//GET WoMen Products
export const womenProducts = () => async (dispatch) => {
	dispatch({ type: PRODUCT_WOMEN_REQUEST });

	try {
		const { data } = await axios.get(`/api/products/women`);
		dispatch({ type: PRODUCT_WOMEN_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_WOMEN_FAILED,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};
//GET Kids Products
export const kidsProducts = () => async (dispatch) => {
	dispatch({ type: PRODUCT_KIDS_REQUEST });

	try {
		const { data } = await axios.get(`/api/products/kids`);
		dispatch({ type: PRODUCT_KIDS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_KIDS_FAILED,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		});
	}
};
