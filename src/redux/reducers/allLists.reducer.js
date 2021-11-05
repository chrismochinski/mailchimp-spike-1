import { combineReducers } from "redux"; 

//GET ALL LISTS
const getAllListsReducer = (state = {}, action) => {
  console.log('inside GET ALL LISTS REDUCER, the action.payload is:', action.payload)
  switch (action.type) {
    case "SET_ALL_LISTS":
      return action.payload;
    default:
      return state;
  }
};

export default getAllListsReducer;
