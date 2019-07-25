import {
  HANDLE_GET_CATEGORIES,
  HANDLE_SET_CATEGORY_FOCUSED,
  HANDLE_ADD_ITEM
}
from "../constants/action-types";
import axios from 'axios';

export function getCategories() {
    return async (dispatcher) => {
        try {
            const data = await axios.get('https://waitstaff.joyup.me/menu/square/5a7371c9a67ad0001a1023f8/36XR5VCKR6AXJ');
            // const data = await axios.get('https://waitstaff.joyup.me/menu/square/5a7371c9a67ad0001a1023f8/36XR5VCKR6AXJ');
   
            dispatcher(handleGetCategories(data.data)); // Thunk'd         
        } catch (error) {
            console.log('error:', error);
            ;
        };
    };
};

export const handleGetCategories = (data) => {
    return {
        type: HANDLE_GET_CATEGORIES,
        payload: data
    };
};

export function setCategoryIdxFocused(categoryIdxFocused) {
    return async (dispatcher) => {
        try {
            categoryIdxFocused = Number(categoryIdxFocused)
            dispatcher(handlesetCategoryFocused(categoryIdxFocused)); // Thunk'd         
        } catch (error) {
            console.log('error:', error);
            ;
        };
    };
};

export const handlesetCategoryFocused = (categoryIdxFocused) => {
    return {
        type: HANDLE_SET_CATEGORY_FOCUSED,
        payload: categoryIdxFocused
    };
};

export function addItem(itemData) {
    return {
        type: HANDLE_ADD_ITEM,
        payload: itemData
    };
}