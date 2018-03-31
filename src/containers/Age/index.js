import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import AgeList from './AgesList'
import AppTimeout from '../App/AppTimeout'
import * as userActions from 'redux/modules/user'
import { exitAnimation } from './animations'
import { Home, Owl } from '../../components'

@connect(
  state => ({
    username: state.user.username,
    agesList: state.user.agesList,
  }),
  {
    ...userActions,
    openPathIllustrations: () => push('/swipe'),
  }
)

class Ages extends React.Component {
  static propTypes = {
    username: PropTypes.string,
    agesList: PropTypes.arrayOf(PropTypes.object),
    setAgeGroup: PropTypes.func,
    openPathIllustrations: PropTypes.func,
  }

  render () {
    const {username, agesList, setAgeGroup, openPathIllustrations} = this.props

    const onAgeButtonClick = (age) => {
      const {ageGroup} = age
      setAgeGroup(ageGroup)
      exitAnimation({
        ...this.refs,
        animationEndCallback: openPathIllustrations,
      })
    }

    return (
      <div id="age">
        <Owl/>
        <Home/>
        <div ref="contentWrap">
          <div className="row">
            {
              username
                ? (
                  <h1 className="written align-center animated bounceInUp">
                    Hoe oud ben je, <span className="uppercaseFirst">{username}?</span>
                  </h1>
                )
                : (
                  <h1 className="written align-center animated bounceInUp">
                    Hoe oud ben je?
                  </h1>
                )
            }
          </div>
          <AgeList
            style={{marginTop: 10}}
            agesList={agesList}
            onAgeButtonClick={onAgeButtonClick}
          />
        </div>
        <AppTimeout maxIntervals={1}/>
      </div>
    )
  }
}

export default Ages
