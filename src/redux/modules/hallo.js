const SET_RENDERED = 'bieblo/hallo/SET_RENDERED'
const RESET = 'bieblo/hallo/RESET'

const initialState = {
  rendered: false,
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_RENDERED:
      return {
        ...state,
        rendered: true,
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

const setRendered = () => ({ type: SET_RENDERED })

export default reducer

export {
  reset,
  setRendered,
}
