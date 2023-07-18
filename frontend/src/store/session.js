import { csrfFetch } from "./csrf";

const SET_CURRENT_USER = "session/SET_CURRENT_USER";
const REMOVE_CURRENT_USER = "session/REMOVE_CURRENT_USER";

const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user,
});

const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER,
});

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await csrfFetch(`/api/session`, {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await res.json();
  dispatch(setCurrentUser(data.user));
  return res;
};

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  const newState = { ...Object.freeze(state) };

  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...newState, user: action.user };
    case REMOVE_CURRENT_USER:
      return { ...newState, user: null };
    default:
      return newState;
  }
}

export default sessionReducer;
