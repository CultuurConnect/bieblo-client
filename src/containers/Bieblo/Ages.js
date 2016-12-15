import React from 'react';
import {connect} from 'react-redux';

import * as biebloActions from 'redux/modules/bieblo';

@connect(
  state => ({
    illustrations: state.bieblo.illustrations,
  }),
  {...biebloActions}
)

export default class Ages extends React.Component {
  render() {
    return (
      <p>Ages</p>
    );
  }
}
