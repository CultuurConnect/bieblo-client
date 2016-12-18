import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {
    App,
    Home,
    NotFound,
    Bieblo,
    Hallo,
    Age,
  } from './containers'

export default () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="hallo" component={Hallo} />
      <Route path="bieblo" component={Bieblo.Libraries} />
      <Route path="leeftijd" component={Age} />
      <Route path="bieblo/:library/:age" component={Bieblo.Illustrations} />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  )
}
