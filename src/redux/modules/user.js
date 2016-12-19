const SET_USERNAME = 'bieblo/user/SET_USERNAME'
const SET_AGE_GROUP = 'bieblo/user/SET_AGE_GROUP'
const RESET = 'bieblo/user/RESET'

const initialState = {
  username: null,
  ageGroup: null,
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
    case SET_AGE_GROUP:
      return {
        ...state,
        ageGroup: action.ageGroup,
      }
    case RESET:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

const reset = () => ({ type: RESET })

const setUsername = (username) => ({ type: SET_USERNAME, username })

const setAgeGroup = (ageGroup) => ({ type: SET_AGE_GROUP, ageGroup })

export default reducer

export {
  reset,
  setUsername,
  setAgeGroup,
}
