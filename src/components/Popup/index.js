import React, {Component} from 'react'

export default class Popup extends Component {

  static propTypes = {
    confirmButton: React.PropTypes.bool,
    confirmButtonText: React.PropTypes.string,
    onConfirmButtonClick: React.PropTypes.func,
    closeButton: React.PropTypes.bool,
    onCloseButtonClick: React.PropTypes.func,
    size: React.PropTypes.oneOf(['default', 'large']),
    children: React.PropTypes.any,
  }

  static defaultProps = {
    confirmButton: false,
    confirmButtonText: 'Ja',
    closeButton: false,
    size: 'default',
  }

  render() {
    const {
      size,
      children,
      confirmButton,
      confirmButtonText,
      onConfirmButtonClick,
      closeButton,
      onCloseButtonClick,
    } = this.props

    const className = `popup-size-${size}`

    return (
      <div id="popup" className={className}>
        <div id="popup-bg"/>
        <div id="popup-content">
          <div id="popup-content-inner">
            {children}
          </div>
        </div>
        {closeButton &&
        <div id="popup-close-btn" className="action-button close-button" onClick={onCloseButtonClick}/>}
        {confirmButton && <div id="popup-confirm-btn" className="action-button"
                               onClick={onConfirmButtonClick}>{confirmButtonText}</div>}
      </div>
    )
  }
}

