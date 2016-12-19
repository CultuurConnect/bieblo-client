import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {reducer as reduxAsyncConnect} from 'redux-async-connect'

import app from './app'
import bieblo from './bieblo'
import user from './user'
import hallo from './hallo'
import results from './results'

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  app,
  bieblo,
  user,
  hallo,
  results,
})
