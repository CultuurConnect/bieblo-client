import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {reset as resetUser} from '../../redux/modules/user'
import {reset as resetBieblo} from '../../redux/modules/bieblo'
import {reset as resetHallo} from '../../redux/modules/hallo'
import {reset as resetResults, load} from '../../redux/modules/results'

import RefreshButton from './RefreshButton'
import RestartButton from './RestartButton'
import ResultsList from './ResultsList'

@connect(
  state => ({
    username: state.user.username,
    ageGroup: state.user.ageGroup,
    rendered: state.hallo.rendered,
    themesLiked: state.bieblo.themesLiked,
    loaded: state.results.loaded,
    loading: state.results.loading,
    resultsList: state.results.data,
  }),
  {
    doResetUser: () => resetUser(),
    doResetBieblo: () => resetBieblo(),
    doResetHallo: () => resetHallo(),
    doResetResults: () => resetResults(),
    goPathHome: () => push('/'),
    doLoad: (ageGroup, themesLiked) => load(ageGroup, themesLiked),
  }
)

class ResultsContainer extends React.Component {
  static propTypes = {
    loaded: React.PropTypes.bool,
    loading: React.PropTypes.bool,
    ageGroup: React.PropTypes.number,
    themesLiked: React.PropTypes.arrayOf(React.PropTypes.object),
    resultsList: React.PropTypes.arrayOf(React.PropTypes.object),
    username: React.PropTypes.string,
    doResetUser: React.PropTypes.func,
    doResetBieblo: React.PropTypes.func,
    doResetHallo: React.PropTypes.func,
    doResetResults: React.PropTypes.func,
    doResultRefresh: React.PropTypes.func,
    goPathHome: React.PropTypes.func,
    doLoad: React.PropTypes.func,
  }

  componentDidMount() {
    const {doLoad, ageGroup, themesLiked} = this.props
    doLoad(ageGroup, themesLiked)
  }

  render() {
    const {loaded, loading, doResetUser, doResetBieblo, doResetHallo, doResetResults, goPathHome, resultsList} = this.props

    const doReset = () => {
      doResetUser()
      doResetBieblo()
      doResetHallo()
      doResetResults()
    }

    const loadingSVG = require('./../App/loading.svg')
    const loadingStyle = {
      height: 150,
      width: 300,
      position: 'absolute',
      top: '50%',
      left: '50%',
      margin: '-75px 0 0 -150px',
      backgroundImage: `url(${loadingSVG})`,
      backgroundPosition: '50% 50%',
      backgroundRepeat: 'no-repeat',
      textAlign: 'center',
    }

    return (
      <div>
        { !loaded && (<div style={loadingStyle} />)}
        { loaded && (
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
            <p>{loading ? 'Loading...' : ''}</p>
          </div>
        )}
      </div>
    )
  }
}

export default ResultsContainer
