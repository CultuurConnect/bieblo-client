import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {
    App,
    Home,
    NotFound,
    Hallo,
    Age,
    Swipe,
  } from './containers'

export default () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="hallo" component={Hallo} />
      <Route path="leeftijd" component={Age} />
      <Route path="swipe" component={Swipe} />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  )
}
