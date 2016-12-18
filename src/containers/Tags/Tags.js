import React, {Component, PropTypes} from 'react'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

import * as tagsActions from 'redux/modules/tags'

@connect(
  state => ({
    tags: state.tags.data,
  }),
  {...tagsActions}
)

export default class Widgets extends Component {
  static propTypes = {
    tags: PropTypes.array,
    add: PropTypes.func.isRequired,
  };

  render() {
    const {tags, add} = this.props
    console.log('constant tags?', tags)
    return (
      <div>
        <h1>
          Tags
        </h1>
        <Helmet title="Regions"/>
        <form className="form">
          <input type="text" ref="tag" placeholder="new tag"/>
          <button onClick={(event) => {
            event.preventDefault()
            add(this.refs.tag.value)
          }}>Add</button>
        </form>
        <hr/>
        <div className="row">
          {
            tags.map((tag)=>(
              <div className="col-md-2">
                <div className="panel">
                  <LinkContainer to={`/tags/${tag.label}`}>
                    <div className="panel-body">
                      {tag.label}
                    </div>
                  </LinkContainer>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}
