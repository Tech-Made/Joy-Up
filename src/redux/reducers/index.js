// src/js/reducers/index.js

import {
  HANDLE_GET_CATEGORIES,
  HANDLE_SET_CATEGORY_FOCUSED,
  HANDLE_ADD_ITEM
} from "../constants/action-types";

const initialState = {
    categories: [],
    categoryIdxFocused: 0,
    inCheckout: []
};

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case HANDLE_GET_CATEGORIES:
      return {...state, categories: action.payload}
    case HANDLE_ADD_ITEM:
      state.inCheckout.push(action.payload);
      return { ...state, inCheckout: state.inCheckout}
    case HANDLE_SET_CATEGORY_FOCUSED:
      return {...state, categoryIdxFocused: action.payload}
    default: 
        return state;
  }
};

export default rootReducer;
