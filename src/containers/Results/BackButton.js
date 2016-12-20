import React from 'react'

const RestartButton = ({doRemoveDetails}) => {
  const onClick = () => {
    doRemoveDetails()
  }

  return (
    <div className="action-button red icon animated bounceInUp" onClick={onClick}>
      <i className="fa fa-sign-out" /> Terug naar resultaten
    </div>
  )
}

export default RestartButton
