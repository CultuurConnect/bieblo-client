import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {reset as resetUser} from '../../redux/modules/user'
import {reset as resetBieblo} from '../../redux/modules/bieblo'
import {reset as resetHallo} from '../../redux/modules/hallo'
import {reset as resetResults} from '../../redux/modules/results'

import RefreshButton from './RefreshButton'
import RestartButton from './RestartButton'
import ResultsList from './ResultsList'

@connect(
  state => ({
    username: state.user.username,
    rendered: state.hallo.rendered,
    results: state.bieblo.results,
  }),
  {
    doResetUser: () => resetUser(),
    doResetBieblo: () => resetBieblo(),
    doResetHallo: () => resetHallo(),
    doResetResults: () => resetResults(),
    goPathHome: () => push('/'),
  }
)

class ResultsContainer extends React.Component {
  static propTypes = {
    resultList: React.PropTypes.arrayOf(React.PropTypes.object),
    username: React.PropTypes.string,
    doResetUser: React.PropTypes.func,
    doResetBieblo: React.PropTypes.func,
    doResetHallo: React.PropTypes.func,
    doResetResults: React.PropTypes.func,
    doResultRefresh: React.PropTypes.func,
    goPathHome: React.PropTypes.func,
  }

  render() {
    const {doResetUser, doResetBieblo, doResetHallo, doResetResults, goPathHome} = this.props

    const resultsList = [
      {id: 1, label: 'dmlkfj', cover: 'http://webservices.bibliotheek.be/index.php?func=cover&ISBN=9789045900698&VLACCnr=2753863&CDR=&EAN=&ISMN=&coversize=small'},
      {id: 2, label: 'ateast'},
      {id: 3, label: 'teasdfst'},
      {id: 4, label: 'test'},
      {id: 5, label: 'tsdfest'},
      {id: 6, label: 'teqazsst'},
      {id: 7, label: 'tesdfst'},
      {id: 8, label: 'test'},
      {id: 9, label: 'tsdfest'},
      {id: 10, label: 'tefdsfst'},
      {id: 11, label: 'test'},
      {id: 12, label: 'tsdest'},
      {id: 13, label: 'test'},
      {id: 14, label: 'tefsdst'},
      {id: 15, label: 'tefdsst'},
    ]
    const doReset = () => {
      doResetUser()
      doResetBieblo()
      doResetHallo()
      doResetResults()
    }

    return (
      <div>
        <div className="container">
          <ResultsList
            resultsList={resultsList}
          />
        </div>

        <div className="action-button-container fixed-bottom align-center">
          <RefreshButton
          />
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
