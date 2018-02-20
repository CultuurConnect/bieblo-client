import React from 'react'
import { IndexRoute, Route } from 'react-router'
import { Age, App, Hallo, Home, NotFound, Results, Swipe } from './containers'

export default () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="hallo" component={Hallo}/>
      <Route path="leeftijd" component={Age}/>
      <Route path="swipe" component={Swipe}/>
      <Route path="resultaten" component={Results}/>
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  )
}
