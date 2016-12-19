import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {reset as resetUser} from '../../redux/modules/user'
import {reset as resetBieblo} from '../../redux/modules/bieblo'
import {reset as resetHallo} from '../../redux/modules/hallo'

import RestartButton from './RestartButton'


@connect(
  state => ({
    username: state.user.username,
    rendered: state.hallo.rendered,
  }),
  {
    doResetUser: () => resetUser(),
    doResetBieblo: () => resetBieblo(),
    doResetHallo: () => resetHallo(),
    goPathHome: () => push('/'),
  }
)

class ResultsContainer extends React.Component {
  static propTypes = {
    username: React.PropTypes.string,
    doResetUser: React.PropTypes.func,
    doResetBieblo: React.PropTypes.func,
    doResetHallo: React.PropTypes.func,
    goPathHome: React.PropTypes.func,
  }

  render() {
    const {doResetUser, doResetBieblo, doResetHallo, goPathHome} = this.props

    const doReset = () => {
      doResetUser()
      doResetBieblo()
      doResetHallo()
    }

    return (
      <div>
        <p>Resultaten...</p>
        <div className="action-button-container fixed-bottom align-center">
          <RestartButton
            doReset={doReset}
            goPathHome={goPathHome}
          />
        </div>
      </div>
    )
  }
}

export default ResultsContainer
