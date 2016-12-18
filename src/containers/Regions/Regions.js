import React, {Component, PropTypes} from 'react'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import { renderRegions } from './Renderers'

import * as regionsActions from 'redux/modules/regions'

@connect(
  state => ({
    regions: state.regions.data,
  }),
  {...regionsActions}
)

export default class Widgets extends Component {
  static propTypes = {
    regions: PropTypes.array,
    expandToggleRegion: PropTypes.func.isRequired,
    expandToggleSubRegion: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
  }

  componentDidMount() {
    console.log('component did mount')
    console.log('loaded regionsActions?', this.props.load())
  }

  render() {
    const {regions, expandToggleRegion, expandToggleSubRegion} = this.props
    return (
      <div>
        <h1>
          Regions
        </h1>
        <Helmet title="Regions"/>
        {renderRegions(regions, expandToggleRegion, expandToggleSubRegion)}
      </div>
    )
  }
}
