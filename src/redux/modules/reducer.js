import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import app from './app';
import regions from './regions';
import tags from './tags';
import illustrations from './illustrations';
import bieblo from './bieblo';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  app,
  regions,
  tags,
  illustrations,
  bieblo
});
