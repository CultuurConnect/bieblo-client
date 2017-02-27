import React from 'react'

const AgeButton = ({age, cols, onAgeButtonClick, animated}) => {
  const animations = ['bounceInDown', 'bounceInUp', 'bounceInLeft', 'bounceInRight']
  const animation = !animated ? `animated ${animations[Math.floor(Math.random() * animations.length)]}` : ''
  const onClick = () => {
    onAgeButtonClick(age)
  }
  return (
    <div className={`action-button-container col-xs-6 col-md-${cols} ${animation}`} style={{textAlign: 'center'}}>
      <div className="action-button green" onClick={onClick}>
        {age.label} Jaar
      </div>
    </div>
  )
}

export default AgeButton
