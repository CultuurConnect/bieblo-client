const LOAD = 'bieblo/app/LOAD'
const LOAD_SUCCESS = 'bieblo/app/LOAD_SUCCESS'
const LOAD_FAIL = 'bieblo/app/LOAD_FAIL'

const initialState = {
  loading: true,
  loaded: false,
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        loaded: false,
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
      }
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      }
    default:
      return state
  }
}


const isLoaded = (globalState) => globalState.app && globalState.app.loaded

const loaded = () => ({ type: LOAD_SUCCESS })

const load = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: (client) => client.get('/widget/load/param1/param2'),
})

export default reducer

export {
  load,
  loaded,
  isLoaded,
}
