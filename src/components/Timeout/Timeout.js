import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

@connect(
  state => ({user: state.auth.user}),
  authActions)

export default class Timeout extends Component {

  render() {

    const {showTimeout} = this.props

    if (!showTimeout)
      return null


    const doReset = () => {
      doResetUser()
      doResetBieblo()
      doResetHallo()
      doResetResults()
    }

    const cancelTimeout = () => {

    }


    return (
      <div>
        <p>Hallo daar? Ben je er nog?</p>
        <button onClick={cancelTimeout}>Ik ben er nog!</button>
      </div>
    )
  }
}
