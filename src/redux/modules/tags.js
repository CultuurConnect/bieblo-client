const LOAD = 'bieblo/tags/LOAD';
const LOAD_SUCCESS = 'bieblo/tags/LOAD_SUCCESS';
const LOAD_FAIL = 'bieblo/tags/LOAD_FAIL';
const ADD_TAG = 'bieblo/tags/ADD_TAG';
const TOGGLE_AGE_1 = 'bieblo/tags/TOGGLE_AGE_1';
const TOGGLE_AGE_2 = 'bieblo/tags/TOGGLE_AGE_2';

const initialState = {
  loaded: false,
  data: []
};


function buildQueryAge1(tag) {
  return tag.label +
    (tag.age1 ? ' (doelgroep:"vanaf 6-8 jaar" NOT genre:"eerste leesboekjes") ' : '');
}

function buildQueryAge2(tag) {
  return tag.label + (tag.age2 ? ' (doelgroep:"vanaf 9-11 jaar") ' : '');
}

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
    case ADD_TAG:
      return {
        ...state,
        data: [
          ...state.data,
          {
            label: action.tag
          }
        ]
      };
    case TOGGLE_AGE_1:
      return {
        ...state,
        data: state.data.map(
          (tag) => {
            if (tag.label === action.tag.label) {
              tag.age1 = !tag.age1;
              tag.age1query = tag.age1 ? buildQueryAge1(tag) : null;
            }
            return tag;
          }
        )
      };
    case TOGGLE_AGE_2:
      return {
        ...state,
        data: state.data.map(
          (tag) => {
            if (tag.label === action.tag.label) {
              tag.age2 = !tag.age2;
              tag.age2query = tag.age2 ? buildQueryAge2(tag) : null;
            }
            return tag;
          }
        )
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

export function add(tag) {
  return {
    type: ADD_TAG,
    tag
  };
}

export function toggleAge1(tag) {
  return {
    type: TOGGLE_AGE_1,
    tag
  };
}

export function toggleAge2(tag) {
  return {
    type: TOGGLE_AGE_2,
    tag
  };
}
