import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Home,
    Login,
    LoginSuccess,
    NotFound,
    Regions,
    Tags,
    TagDetails,
    Illustrations,
    Bieblo
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="illustrations" component={Illustrations}/>
        <Route path="loginSuccess" component={LoginSuccess}/>
        <Route path="regions" component={Regions}/>
        <Route path="tags" component={Tags}/>
        <Route path="tags/:tag" component={TagDetails} />
      </Route>

      { /* Routes */ }
      <Route path="login" component={Login}/>

      <Route path="bieblo" component={Bieblo.Libraries} />
      <Route path="bieblo/:library" component={Bieblo.Ages} />
      <Route path="bieblo/:library/:age" component={Bieblo.Illustrations} />

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
