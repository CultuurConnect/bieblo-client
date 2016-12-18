import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import config from '../../config'
import { loaded } from 'redux/modules/app'
import AppTitle from './AppTitle'
import AppLoading from './AppLoading'
import AppBackground from './AppBackground'

@connect(
  state => ({
    loading: state.app.loading,
    path: state.routing.locationBeforeTransitions.pathname,
  }),
  {pushAppLoaded: loaded}
)

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushAppLoaded: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    path: PropTypes.string,
  };

  componentDidMount() {
    const { pushAppLoaded } = this.props
    const setAppLoaded = () => { pushAppLoaded() }
    setTimeout(setAppLoaded, 100)
  }

  render() {
    const {children, loading, path} = this.props
    require('./App.scss')
    return (
      <div>
        <Helmet {...config.app.head}/>
        { !loading && <AppBackground /> }
        { !loading && path !== '/' && <AppTitle /> }
        { !loading && children ? children : <AppLoading /> }
      </div>
    )
  }
}
