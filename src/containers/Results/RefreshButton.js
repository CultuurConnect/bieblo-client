import React from 'react'

const RefreshButton = ({doReset, goPathHome}) => {
  const onClick = () => {
    doReset()
    goPathHome()
  }

  return (
    <div className="action-button green icon animated bounceInUp" onClick={onClick}>
      <i className="fa fa-refresh" /> Andere boeken
    </div>
  )
}

export default RefreshButton
