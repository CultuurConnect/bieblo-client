import React from 'react'
import {connect} from 'react-redux'
import AgeList from './AgesList'

import * as biebloActions from 'redux/modules/bieblo'

@connect(
  state => ({
    username: state.user.username,
    agesList: state.user.agesList,
  }),
  {...biebloActions}
)

class Ages extends React.Component {
  static propTypes = {
    username: React.PropTypes.string,
    agesList: React.PropTypes.arrayOf(React.PropTypes.object),
  }

  render() {
    const {username, agesList} = this.props
    console.log('render()', agesList)
    return (
      <div>
        <div className="row">
          <h1 className="written align-center animated bounceInUp">
            {username ? `Hoe oud ben je ${username}?` : 'Klik op jouw leeftijd!' }
          </h1>
        </div>
        <AgeList
          style={{marginTop: 10}}
          agesList={agesList}
        />
      </div>
    )
  }
}

export default Ages
