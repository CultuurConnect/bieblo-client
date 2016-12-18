import React from 'react'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Shake } from 'reshake'

import Keyboard, {DEFAULT_CHARACTERS} from '../../components/Keyboard'
import * as userActions from 'redux/modules/user'
import * as halloActions from 'redux/modules/hallo'

@connect(
  state => ({
    username: state.user.username,
    rendered: state.hallo.rendered,
  }),
  {
    ...userActions,
    ...halloActions,
  }
)

class halloComponent extends React.Component {
  static propTypes = {
    username: React.PropTypes.string,
    rendered: React.PropTypes.bool,
    setUsername: React.PropTypes.func,
    setRendered: React.PropTypes.func,
  }

  componentDidMount() {
    const {setRendered} = this.props
    setTimeout(() => { setRendered() }, 1500)
  }

  render() {
    const {username, rendered, setUsername} = this.props
    const logoClasses = `written align-center ${rendered ? '' : 'animated bounceInDown'}`
    return (
      <div className="container">
        <Shake
          h={4}
          v={4}
          r={2}
          dur={450}
          int={10}
          max={100}
          fixed
          fixedStop={false}
          freez={false}>
          <h1 ref="logo" className={logoClasses} style={{fontSize: 60, marginTop: 25}}>Bieblo</h1>
        </Shake>
        <hr />
        <h2 className="written align-center animated bounceIn">Hallo daar! Wat is jouw naam?</h2>
        <div className="row">
          <div className="col-md-offset-4 col-md-4">
            <div className="written align-center text-color-blue uppercaseFirst">
              <h3 style={{fontSize: '3em'}}>{username ? username : '...'}</h3>
              <hr style={{width: 100}}/>
            </div>
          </div>
        </div>
        <Keyboard
          characters={DEFAULT_CHARACTERS}
          value={username}
          onUpdateValue={setUsername}
          animated={!rendered}
        />
        <div className="row">
          <div className="align-center" style={{marginTop: 50}}>
            <LinkContainer to="/leeftijd">
              <div className="action-button blue icon">
                <i className="fa fa-play-circle" /> Verder!
              </div>
            </LinkContainer>
          </div>
        </div>
      </div>
    )
  }
}

export default halloComponent
