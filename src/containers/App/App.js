import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import config from '../../config'
import { loaded } from 'redux/modules/app'

@connect(
  state => ({
    loading: state.app.loading,
  }),
  {pushAppLoaded: loaded}
)

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushAppLoaded: PropTypes.func.isRequired,
    loading: PropTypes.bool,
  };

  componentDidMount() {
    const { pushAppLoaded } = this.props
    const setAppLoaded = () => { pushAppLoaded() }
    setTimeout(setAppLoaded, 1000)
  }

  render() {
    const {children} = this.props
    require('./App.scss')
    return (
      <div>
        <Helmet {...config.app.head}/>
        { children ? children : <div>Content</div> }
      </div>
    )
  }
}
