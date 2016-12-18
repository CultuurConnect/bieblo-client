const LOAD = 'bieblo/illustrations/LOAD'
const LOAD_SUCCESS = 'bieblo/illustrations/LOAD_SUCCESS'
const LOAD_FAIL = 'bieblo/illustrations/LOAD_FAIL'
const ADD = 'bieblo/illustrations/ADD'

const initialState = {
  loaded: false,
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
        data: action.result,
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
    case ADD:
      return {
        ...state,
        data: [
          ...state.data,
          {
            title: action.title,
          },
        ],
      }
    default:
      return state
  }
}

const load = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: (client) => client.get('/regions/tree'),
})

const add = (title) => ({
  type: ADD,
  title,
})

export default reducer

export {
  load,
  add,
}