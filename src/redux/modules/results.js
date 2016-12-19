const RESET = 'bieblo/results/RESET'

const initialState = {
  loading: false,
  displayedResults: [],
  resultList: [],
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case RESET:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

const reset = () => ({ type: RESET })

export default reducer

export {
  reset,
}
