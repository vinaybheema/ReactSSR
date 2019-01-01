import axios from "axios";

export const FETCH_USERS = "fetch_users";

export const fetchUsers = () => async (dispatch, getState, api) => {
  // const response = await axios.get("https://react-ssr-api.herokuapp.com/users");
  const response = await api.get("/users");
  dispatch({ type: FETCH_USERS, payload: response.data });
};

export const FETCH_CURRENT_USER = "fetch_current_user";

export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const response = await api.get(
    "/current_user"
  );
  dispatch({ type: FETCH_CURRENT_USER, payload: response.data });
};
