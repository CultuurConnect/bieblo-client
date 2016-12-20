const RESET = 'bieblo/results/RESET'
const LOAD = 'bieblo/results/LOAD'
const LOAD_SUCCESS = 'bieblo/results/LOAD_SUCCESS'
const LOAD_FAIL = 'bieblo/results/LOAD_FAIL'

const initialState = {
  loaded: false,
  loading: false,
  displayedResults: [],
  data: [],
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
    case RESET:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

const reset = () => ({ type: RESET })

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
}
