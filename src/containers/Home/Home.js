import React, { Component } from 'react'

import Helmet from 'react-helmet'
import { Shake } from 'reshake'
import { push } from 'react-router-redux'


import { connect } from 'react-redux'
import {addAnimationEventListener, startAnimation} from './animation'


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
    addAnimationEventListener(this.refs.animation)
  }

  render() {
    const { dispatch } = this.props

    const onClickStart = () => {
      const startAnimationEndedCallback = () => {
        dispatch(push('/hallo'))
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
        <Shake
          h={4}
          v={4}
          r={2}
          dur={450}
          int={10}
          max={100}
          fixed
          fixedStop={false}
          freez={false}>
          <h1 ref="logo" className="written align-center animated flipInX" style={{fontSize: 120, marginTop: 50}}>Bieblo</h1>
        </Shake>

        <div className="container">
            <hr/>
            <h2 className="font-mono align-center animated fadeIn" ref="animation">Opzoek naar een boek?</h2>
        </div>

        <div className="align-center" style={{marginTop: 50}}>
          <div ref="startButton" className="action-button blue icon" onClick={onClickStart}>
            <i className="fa fa-play-circle" /> Start!
          </div>
        </div>
      </div>
    )
  }
}
