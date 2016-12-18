const SET_USERNAME = 'bieblo/user/SET_USERNAME'

const initialState = {
  username: null,
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.username,
      }
    default:
      return state
  }
}

const setUsername = (username) => ({ type: SET_USERNAME, username })

export default reducer

export {
  setUsername,
}
