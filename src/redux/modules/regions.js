const LOAD = 'bieblo/regions/LOAD';
const LOAD_SUCCESS = 'bieblo/regions/LOAD_SUCCESS';
const LOAD_FAIL = 'bieblo/regions/LOAD_FAIL';
const EXPAND_TOGGLE = 'bieblo/regions/EXPAND_TOGGLE';

const initialState = {
  loaded: false,
  data: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: [],
        error: action.error
      };
    case EXPAND_TOGGLE:
      const regions = state.data.map(
        (region) => {
          if (region.id === action.region.id) {
            region.expanded = !region.expanded;
          }
          return region;
        }
      );
      return {
        ...state,
        data: regions
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.widgets && globalState.widgets.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/regions/tree') // params not used, just shown as demonstration
  };
}

export function expandToggleRegion(region) {
  return {
    type: EXPAND_TOGGLE,
    region
  };
}
