import React from 'react'

const RefreshButton = ({doRefresh}) => {
  const onClick = () => {
    doRefresh()
  }

  return (
    <div className="action-button green icon animated bounceInUp" onClick={onClick}>
      <i className="fa fa-refresh" /> Andere boeken
    </div>
  )
}

export default RefreshButton
