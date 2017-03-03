import React, {Component} from 'react'
import {Popup} from '../index'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {reset as resetUser} from '../../redux/modules/user'
import {reset as resetBieblo} from '../../redux/modules/bieblo'
import {reset as resetHallo} from '../../redux/modules/hallo'
import {reset as resetResults} from '../../redux/modules/results'

@connect(
  state => ({
    username: state.user.username,
    ageGroup: state.user.ageGroup,
    rendered: state.hallo.rendered,
    themesLiked: state.bieblo.themesLiked,
    loaded: state.results.loaded,
    loading: state.results.loading,
    resultsList: state.results.data,
    details: state.results.details,
    renderedList: state.results.renderedList,
  }),
  {
    doResetUser: () => resetUser(),
    doResetBieblo: () => resetBieblo(),
    doResetHallo: () => resetHallo(),
    doResetResults: () => resetResults(),
    goPathHome: () => push('/'),
  }
)

export default class Home extends Component {

  static propTypes = {
    doResetUser: React.PropTypes.func,
    doResetBieblo: React.PropTypes.func,
    doResetHallo: React.PropTypes.func,
    doResetResults: React.PropTypes.func,
    goPathHome: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {displayConfirmDialog: false}
  }

  render() {
    const { doResetUser, doResetBieblo, doResetHallo, doResetResults, goPathHome } = this.props
    const { displayConfirmDialog } = this.state

    const doReset = () => {
      doResetUser()
      doResetBieblo()
      doResetHallo()
      doResetResults()
      goPathHome()
    }

    const askConfirm = () => {
      this.setState({
        displayConfirmDialog: true,
      })
    }

    const closeConfirm = () => {
      this.setState({
        displayConfirmDialog: false,
      })
    }

    return (
      <div>
        <div id="home-btn" className="action-button" onClick={askConfirm} />
        {
          displayConfirmDialog &&
          <Popup
            confirmButton
            confirmButtonText={'Ja'}
            onConfirmButtonClick={doReset}
            closeButton
            onCloseButtonClick={closeConfirm}
          >
            <p className="big-text align-center title-text-style">Ben je zeker dat je bieblo wil stoppen?</p>
          </Popup>
        }
      </div>
    )
  }
}
