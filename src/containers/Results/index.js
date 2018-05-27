import React from 'react'
import { connect } from 'react-redux'
import { Home, Owl } from '../../components'
import AppTimeout from '../App/AppTimeout'

import { load, refresh, removeDetails, setDetails, setRenderedList } from '../../redux/modules/results'

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
    themesDisliked: state.bieblo.themesDisliked,
    loaded: state.results.loaded,
    loading: state.results.loading,
    resultsList: state.results.data,
    details: state.results.details,
    renderedList: state.results.renderedList,
  }),
  {
    doLoad: (ageGroup, themes) => load(ageGroup, themes),
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
    themesDisliked: React.PropTypes.arrayOf(React.PropTypes.object),
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

  componentDidMount () {
    const {doLoad, ageGroup, themesLiked, themesDisliked} = this.props
    doLoad(ageGroup, themesLiked.length > 0 ? themesLiked : themesDisliked)
  }

  render () {
    const {
      loaded,
      loading,
      details,
      doLoad,
      ageGroup,
      themesLiked,
      themesDisliked,
      doShowDetails,
      doRemoveDetails,
      resultsList,
    } = this.props

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

    const clickRefresh = () => {
      doLoad(ageGroup, themesLiked.length > 0 ? themesLiked : themesDisliked)
    }

    return (
      <div id="results">
        <Home/>
        <Owl/>
        {!loaded && (<div style={loadingStyle}/>)}
        {loaded && !details && (
          <div>
            <div id="result-wrapper" className="container">
              <h1 className="written align-center animated bounceInUp">
                Boeken
              </h1>
              <h4 className="results-help-text">Klik op een boek voor meer info</h4>
              <ResultsList
                resultsList={resultsList}
                doShowDetails={doShowDetails}
              />
            </div>

            <div className="action-button-container fixed-bottom align-center">
              <RefreshButton
                doRefresh={clickRefresh}
              />
            </div>
            <p>{loading ? 'Loading...' : <AppTimeout/>}</p>
          </div>
        )}
        {loaded && details && (
          <div>
            <div id="result-wrapper" className="container">
              <h1 className="written align-center animated bounceInUp">
                Info
              </h1>
              <div className="row">
                <div className="col-md-4">
                  <img className="animated bounceInDown book" src={changeCoverSizeToLarge(details.cover)}/>
                </div>
                <div className="col-md-8">
                  <div className="animated lightSpeedIn">
                    <h3 className="book-title animated">{details.title}</h3>
                    <p className="book-summary">{details.summary}</p>
                    <br/>
                    <h4 className="book-location">Dit boek staat hier in de bib</h4>
                    <div className="col-md-8 book-location-text">
                      <p>{details.subloc}</p>
                      <p>{details.shelfmark}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="action-button-container back-button-container" style={{marginTop: 30}}>
              <BackButton
                doRemoveDetails={doRemoveDetails}
              />
            </div>
            <AppTimeout/>
          </div>
        )}
      </div>
    )
  }
}

export default ResultsContainer
