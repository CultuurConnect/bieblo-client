import React, {Component, PropTypes} from 'react'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import {renderIllustrations} from './Renderers'

import * as illustrationActions from 'redux/modules/illustrations'

@connect(
  state => ({
    illustrations: state.illustrations.data,
  }),
  {...illustrationActions}
)

export default class Widgets extends Component {
  static propTypes = {
    illustrations: PropTypes.array,
    add: PropTypes.func.isRequired,
  };

  render() {
    const {illustrations} = this.props
    return (
      <div>
        <h1>
          Illustrations
        </h1>
        <Helmet title="Illustrations"/>
        {illustrations.length && renderIllustrations(illustrations)}
        {!illustrations.length && (
          <div className="panel panel-warning">
            <div className="panel-heading">Opgepast!</div>
            <div className="panel-body">
              <p>Er bevinden zich nog geen illustraties in het systeem.</p>
            </div>
          </div>
        )}
      </div>
    )
  }
}
