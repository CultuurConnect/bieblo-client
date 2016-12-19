import React from 'react'

const RestartButton = ({doReset, goPathHome}) => {
  const onClick = () => {
    doReset()
    goPathHome()
  }

  return (
    <div className="action-button red icon animated bounceInUp" onClick={onClick}>
      <i className="fa fa-sign-out" /> Afsluiten
    </div>
  )
}

export default RestartButton
