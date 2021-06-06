import {
	CATEGORY_CREATE_FAIL,
	CATEGORY_CREATE_REQUEST,
	CATEGORY_CREATE_RESET,
	CATEGORY_CREATE_SUCCESS,
	CATEGORY_DELETE_FAIL,
	CATEGORY_DELETE_REQUEST,
	CATEGORY_DELETE_SUCCESS,
	CATEGORY_GET_FAIL,
	CATEGORY_GET_REQUEST,
	CATEGORY_GET_SUCCESS,
	CATEGORY_UPDATE_FAIL,
	CATEGORY_UPDATE_REQUEST,
	CATEGORY_UPDATE_SUCCESS,
	SUBCATEGORY_GET_FAIL,
	SUBCATEGORY_GET_REQUEST,
	SUBCATEGORY_GET_SUCCESS
} from '../types/CategoryTypes';

//GET ALL CATEGORY REDUCER
export const getCategories = (state ={} , action) => {
	switch (action.type) {
		case CATEGORY_GET_REQUEST:
			return { loading: true };
		case CATEGORY_GET_SUCCESS:
			return { loading: false, success: true, categories: action.payload.categories, total:action.payload.total, count:action.payload.count,  };
		case CATEGORY_GET_FAIL:
			return { error: action.payload, loading: false };
		default:
			return state;
	}
};
// CREATE A NEW CATEGORY REDUER
export const createCategory = (state ={}, action) => {
	switch (action.type) {
		case CATEGORY_CREATE_REQUEST:
			return { loading: true };
		case CATEGORY_CREATE_SUCCESS:
			return { loading: false, success: true, categories: action.payload };
		case CATEGORY_CREATE_FAIL:
			return { error: action.payload,success:false, loading: false };
		 case CATEGORY_CREATE_RESET:
		 	return { };
		default:
			return state;
	}
};

// UPDATE CATEGORY REDUER
export const updateCategory = (state ={}, action) => {
	switch (action.type) {
		case CATEGORY_UPDATE_REQUEST:
			return { loading: true };
		case CATEGORY_UPDATE_SUCCESS:
			return { loading: false, success: true, categories: action.payload };
		case CATEGORY_UPDATE_FAIL:
			return { error: action.payload, loading: false };
		default:
			return state;
	}
};

// DELETE CATEGORY REDUER
export const deleteCategory = (state ={}, action) => {
	switch (action.type) {
		case CATEGORY_DELETE_REQUEST:
			return { loading: true };
		case CATEGORY_DELETE_SUCCESS:
			return { loading: false, success: true, categories: action.payload };
		case CATEGORY_DELETE_FAIL:
			return { error: action.payload, loading: false };
		default:
			return state;
	}
};


//GET ALL SUB CATEGORY REDUCER
export const getSubCategories = (state ={} , action) => {
	switch (action.type) {
		case SUBCATEGORY_GET_REQUEST:
			return { loading: true };
		case SUBCATEGORY_GET_SUCCESS:
			return { loading: false, success: true, categories: action.payload.categories, total:action.payload.total, count:action.payload.count,  };
		case SUBCATEGORY_GET_FAIL:
			return { error: action.payload, loading: false };
		default:
			return state;
	}
};