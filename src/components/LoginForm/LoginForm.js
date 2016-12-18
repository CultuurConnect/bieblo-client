import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as authActions from 'redux/modules/auth'

@connect(
  state => ({user: state.auth.user}),
  authActions)

export default class LoginForm extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const input = this.refs.username
    this.props.login(input.value)
    input.value = ''
  }

  render() {
    const {user, logout} = this.props
    const styles = require('./LoginForm.scss')

    return (
      <div className={styles.loginWrap}>
        {!user &&
        <div>
          <form className="form-signin" onSubmit={this.handleSubmit}>
            <h2 className="form-signin-heading">Please sign in</h2>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input ref="username" type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                <div className="checkbox">
                  <label>
                    <input type="checkbox" value="remember-me" /> Remember me
                  </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleSubmit}>Sign in</button>
          </form>
          <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>
          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    )
  }
}
