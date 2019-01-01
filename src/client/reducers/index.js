import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
  users: usersReducer
});
