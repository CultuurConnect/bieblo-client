const SET_RENDERED = 'bieblo/hallo/SET_RENDERED'

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
    default:
      return state
  }
}

const setRendered = () => ({ type: SET_RENDERED })

export default reducer

export {
  setRendered,
}
