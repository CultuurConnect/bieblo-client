const RESET = 'bieblo/results/RESET'
const LOAD = 'bieblo/results/LOAD'
const LOAD_SUCCESS = 'bieblo/results/LOAD_SUCCESS'
const LOAD_FAIL = 'bieblo/results/LOAD_FAIL'
const SET_DETAILS = 'bieblo/results/SET_DETAILS'
const REMOVE_DETAILS = 'bieblo/results/REMOVE_DETAILS'
const REFRESH = 'bieblo/results/REFRESH'

const initialState = {
  loaded: false,
  loading: false,
  displayedResults: [],
  data: [],
  details: null,
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: [
          ...state.data,
          ...action.result,
        ],
        error: null,
      }
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: [],
        error: action.error,
      }
    case REFRESH:
      const newData = [...state.data]
      newData.reverse()
      return {
        ...state,
        data: newData,
      }
    case RESET:
      return {
        ...initialState,
      }
    case SET_DETAILS:
      return {
        ...state,
        details: action.details,
      }
    case REMOVE_DETAILS:
      return {
        ...state,
        details: null,
      }
    default:
      return state
  }
}

const refresh = () => ({ type: REFRESH })

const reset = () => ({ type: RESET })

const setDetails = (details) => ({ type: SET_DETAILS, details })

const removeDetails = () => ({ type: REMOVE_DETAILS })

const load = (ageGroup, likes) => {
  let query = `ageGroup=${ageGroup}&`
  likes.forEach((like) => query += 'likes[]=' + like.id + '&')
  return ({
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/results/books?' + query),
  })
}

export default reducer

export {
  load,
  reset,
  setDetails,
  removeDetails,
  refresh,
}
