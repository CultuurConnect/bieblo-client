import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

// import { Shake } from 'reshake'

import Keyboard, {DEFAULT_CHARACTERS} from '../../components/Keyboard'
import * as userActions from 'redux/modules/user'
import * as halloActions from 'redux/modules/hallo'
import {nextAnimation} from './animations'


@connect(
  state => ({
    username: state.user.username,
    rendered: state.hallo.rendered,
  }),
  {
    ...userActions,
    ...halloActions,
    openPath: (path) => push(path),
  }
)

class halloComponent extends React.Component {
  static propTypes = {
    username: React.PropTypes.string,
    rendered: React.PropTypes.bool,
    setUsername: React.PropTypes.func,
    setRendered: React.PropTypes.func,
    openPath: React.PropTypes.func,
  }

  componentDidMount() {
    const {setRendered} = this.props
    setTimeout(() => { setRendered() }, 1500)
  }

  render() {
    const {username, rendered, setUsername, openPath} = this.props

    const onClickNext = () => {
      nextAnimation({
        ...this.refs,
        username,
        afterNextAnimationCallback: () => {
          openPath('/leeftijd')
        },
      })
    }
    return (
      <div>
        <div className="container">
          <h2 ref="title" className="written align-center animated bounceIn">Hallo daar! Wat is jouw naam?</h2>
          <div className="row">
            <div ref="usernameContainer" className="col-md-offset-4 col-md-4">
              <div className="written align-center text-color-blue uppercaseFirst">
                <h3 style={{fontSize: '3em'}}>{username ? username : '...'}</h3>
                <hr style={{width: 100}}/>
              </div>
            </div>
          </div>
          <div ref="keyboard">
            <Keyboard
              characters={DEFAULT_CHARACTERS}
              value={username}
              onUpdateValue={setUsername}
              animated={!rendered}
            />
          </div>
        </div>
        <div className="action-button-container fixed-bottom align-center">
          <div ref="nextButton" className="action-button blue icon animated bounceInUp" onClick={onClickNext}>
            <i className="fa fa-play-circle" /> Verder!
          </div>
        </div>
      </div>
    )
  }
}

export default halloComponent
