import React, {Component} from 'react'
import { Popup } from '../../components/index'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {reset as resetUser} from '../../redux/modules/user'
import {reset as resetBieblo} from '../../redux/modules/bieblo'
import {reset as resetHallo} from '../../redux/modules/hallo'
import {reset as resetResults} from '../../redux/modules/results'

// 1 minute
const CHECK_INTERVAL = 1000 * 60

@connect(
  state => ({
    username: state.user.username,
    ageGroup: state.user.ageGroup,
    rendered: state.hallo.rendered,
    themesLiked: state.bieblo.themesLiked,
    themesDisliked: state.bieblo.themesDisliked,
    loaded: state.results.loaded,
    loading: state.results.loading,
    resultsList: state.results.data,
    details: state.results.details,
    renderedList: state.results.renderedList,
  }),
  {
    doResetUser: () => resetUser(),
    doResetBieblo: () => resetBieblo(),
    doResetHallo: () => resetHallo(),
    doResetResults: () => resetResults(),
    goPathHome: () => push('/'),
  }
)

export default class AppTimeout extends Component {

  static propTypes = {
    doResetUser: React.PropTypes.func,
    doResetBieblo: React.PropTypes.func,
    doResetHallo: React.PropTypes.func,
    doResetResults: React.PropTypes.func,
    goPathHome: React.PropTypes.func,
    maxIntervals: React.PropTypes.number,
  }

  static defaultProps = {
    maxIntervals: 2,
  }

  constructor(props) {
    super(props)
    this.state = {displayTimeoutDialog: false}
  }

  componentDidMount() {
    this.startCheckTimeout()
  }

  componentWillUnmount() {
    this.clearCurrentInterval()
  }

  clearCurrentInterval() {
    if (this.intervalRef) {
      clearInterval(this.intervalRef)
    }
  }

  startCheckTimeout() {
    const check = () => {
      this.checkTimeout()
    }
    this.intervalCount = 0
    this.intervalRef = setInterval(check, CHECK_INTERVAL)
    this.intervalMax = parseInt(this.props.maxIntervals, 10)
  }

  startCountDown() {
    const check = () => {
      this.checkCountDown()
    }
    this.intervalCount = 0
    this.intervalRef = setInterval(check, CHECK_INTERVAL)
    this.intervalMax = 1
  }

  checkTimeout() {
    this.intervalCount++
    if (this.intervalCount >= this.intervalMax ) {
      this.clearCurrentInterval()
      this.setState({
        displayTimeoutDialog: true,
      })
      this.startCountDown()
    }
  }
  checkCountDown() {
    this.intervalCount++
    if (this.intervalCount >= this.intervalMax ) {
      this.clearCurrentInterval()
      const { doResetUser, doResetBieblo, doResetHallo, doResetResults, goPathHome } = this.props

      const doReset = () => {
        doResetUser()
        doResetBieblo()
        doResetHallo()
        doResetResults()
        goPathHome()
      }

      doReset()
    }
  }

  render() {
    const { displayTimeoutDialog } = this.state

    const closeConfirm = () => {
      this.setState({
        displayTimeoutDialog: false,
      })
      this.clearCurrentInterval()
      this.startCheckTimeout()
    }

    return (
      <div>
        {
          displayTimeoutDialog &&
          <Popup
            confirmButton
            confirmButtonText={'Ja'}
            onConfirmButtonClick={closeConfirm}
          >
            <p className="big-text align-center title-text-style">Ben je daar nog?</p>
          </Popup>
        }
      </div>
    )
  }
}
