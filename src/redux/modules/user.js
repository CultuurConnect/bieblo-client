const SET_USERNAME = 'bieblo/user/SET_USERNAME'

const initialState = {
  username: null,
  agesList: [
    {id: 1, age: 7, label: 7, ageGroup: 1},
    {id: 2, age: 8, label: 8, ageGroup: 1},
    {id: 3, age: 9, label: 9, ageGroup: 2},
    {id: 4, age: 10, label: 10, ageGroup: 2},
    {id: 5, age: 11, label: 11, ageGroup: 2},
  ],
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
