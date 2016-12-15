import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import Switch from 'react-bootstrap-switch';

import * as tagsActions from 'redux/modules/tags';

@connect(
  state => ({
    tags: state.tags.data,
  }),
  {...tagsActions}
)

export default class Widgets extends Component {
  static propTypes = {
    tags: PropTypes.array,
    query: PropTypes.string,
    params: PropTypes.Object,
    add: PropTypes.func.isRequired,
    toggleAge1: PropTypes.func.isRequired,
    toggleAge2: PropTypes.func.isRequired
  };

  render() {
    const { params, query, tags, toggleAge1, toggleAge2 } = this.props;
    const { tag } = params;

    const stateTag = tags.find((item) => item.label === tag);

    console.log(stateTag);

    return (
      <div>
        <h1>
          Tags {tag}
        </h1>
        <Helmet title={`Tags - ${tag}`}/>
        <hr/>
        <div className="row">
          <div className="col-md-8">
            <div className="input-group">
              <label className="label">Tag</label>
              <input type="text" className="form-control" defaultValue={tag}/>
            </div>
            <div className="input-group">
              <label className="label">Query</label>
              <input type="text" className="form-control" defaultValue={query}/>
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-group">
              <Switch bsSize="mini" defaultValue={stateTag.age1} onChange={() => toggleAge1(stateTag) } /> 7-8 jaar
              <input type="text" className="form-control" value={stateTag.age1query} disabled="disabled" />
            </div>
            <div className="input-group">
              <Switch bsSize="mini" defaultValue={stateTag.age2} onChange={() => toggleAge2(stateTag) } /> 9-11 jaar
              <input type="text" className="form-control" value={stateTag.age2query} disabled="disabled" />
            </div>
          </div>
        </div>
        <hr/>
        <div className="row">
          <button className="btn btn-primary">Opslaan</button>
        </div>
      </div>
    );
  }
}
