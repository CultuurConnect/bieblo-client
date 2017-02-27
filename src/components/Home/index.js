import React, {Component} from 'react'
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

  render() {
    const { doResetUser, doResetBieblo, doResetHallo, doResetResults, goPathHome } = this.props

    const doReset = () => {
      doResetUser()
      doResetBieblo()
      doResetHallo()
      doResetResults()
      goPathHome()
    }

    return (
      <div id="home-btn" className="action-button" onClick={doReset} />
    )
  }
}
