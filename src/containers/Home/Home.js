import React, { Component } from 'react'

import Helmet from 'react-helmet'
import { push } from 'react-router-redux'


import { connect } from 'react-redux'
import {startAnimation} from './animation'


@connect(
    state => ({
      username: state.user.username,
    })
)

export default class Home extends Component {
  static propTypes = {
    username: React.PropTypes.string,
    dispatch: React.PropTypes.func,
  }

  componentDidMount() {
    // addAnimationEventListener(this.refs.animation)
  }

  render() {
    const { dispatch } = this.props

    const onClickStart = () => {
      const startAnimationEndedCallback = () => {
        dispatch(push('/leeftijd'))
      }
      const { startButton, animation, logo } = this.refs
      startAnimation({
        logo,
        animation,
        startButton,
        startAnimationEndedCallback,
      })
    }

    return (
      <div>
        <Helmet title="Home"/>
        <div id="home-logo">
          <h2 className="align-center animated fadeIn" ref="animation">Op zoek naar een boek?</h2>
          <img id="logo" ref="logo" className="animated flipInX" src="/theme/bieblo-forrest/1080/logo.png"/>
        </div>
        <div id="home-button-container" className="action-button-container fixed-bottom align-center">
          <div ref="startButton" className="action-button blue" onClick={onClickStart}>
            Start!
          </div>
        </div>
        <div id="home-disclaimer">
          <p>Bieblo is een realisatie van</p>
          <div id="logo-cultuurconnect" />
          <div id="logo-de-krook" />
          <div id="logo-vlaamse-gemeenschap" />
        </div>
      </div>
    )
  }
}
