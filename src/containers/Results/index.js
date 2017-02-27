import React from 'react'
import { connect } from 'react-redux'
import { Owl, Home } from '../../components'

import {load, setDetails, removeDetails, refresh, setRenderedList} from '../../redux/modules/results'

import BackButton from './BackButton'
import RefreshButton from './RefreshButton'
import ResultsList from './ResultsList'

const changeCoverSizeToLarge = (cover) => cover ? cover.replace('coversize=small', 'coversize=large') : ''

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
    doLoad: (ageGroup, themesLiked) => load(ageGroup, themesLiked),
    doShowDetails: (result) => setDetails(result),
    doRemoveDetails: () => removeDetails(),
    doRefresh: () => refresh(),
    doSetRenderedList: (renderedList) => setRenderedList(renderedList),
  }
)

class ResultsContainer extends React.Component {
  static propTypes = {
    loaded: React.PropTypes.bool,
    loading: React.PropTypes.bool,
    ageGroup: React.PropTypes.number,
    themesLiked: React.PropTypes.arrayOf(React.PropTypes.object),
    resultsList: React.PropTypes.arrayOf(React.PropTypes.object),
    renderedList: React.PropTypes.array,
    doSetRenderedList: React.PropTypes.func,
    username: React.PropTypes.string,
    doResultRefresh: React.PropTypes.func,
    doRefresh: React.PropTypes.func,
    doLoad: React.PropTypes.func,
    doShowDetails: React.PropTypes.func,
    doRemoveDetails: React.PropTypes.func,
    details: React.PropTypes.object,
  }

  componentDidMount() {
    const {doLoad, ageGroup, themesLiked} = this.props
    doLoad(ageGroup, themesLiked)
  }

  render() {
    const {loaded, loading, details, doRefresh, renderedList, doSetRenderedList, doShowDetails, doRemoveDetails, resultsList} = this.props

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
      <div id="results">
        <Home />
        <Owl />
        { !loaded && (<div style={loadingStyle} />)}
        { loaded && !details && (
          <div>
            <div id="result-wrapper" className="container">
              <h1 className="written align-center animated bounceInUp">
                Boeken
              </h1>
              <ResultsList
                resultsList={resultsList}
                renderedList={renderedList}
                doSetRenderedList={doSetRenderedList}
                doShowDetails={doShowDetails}
              />
            </div>

            <div className="action-button-container fixed-bottom align-center">
              <RefreshButton
                doRefresh={doRefresh}
              />
            </div>
            <p>{loading ? 'Loading...' : ''}</p>
          </div>
        )}
        { loaded && details && (
          <div>
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <img className="animated bounceInDown book" src={changeCoverSizeToLarge(details.cover)} />
                </div>
                <div className="col-md-8">
                  <div className="animated lightSpeedIn">
                    <h3 className="animated">{details.title}</h3>
                    <h4>{details.author}</h4>
                    <hr/>
                    <p>{details.summary}</p>
                    <hr/>
                    <div className="animated bounceInUp book-location">
                        <h3>Waar vind je dit boek?</h3>
                        <p>{details.subloc}</p>
                        <p>{details.shelfmark}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="action-button-container align-center" style={{marginTop: 30}}>
              <BackButton
                doRemoveDetails={doRemoveDetails}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default ResultsContainer
