import React from 'react'

const renderCharacterKey = (character, value, onUpdateValue, animated) => {
  const onClick = () => {
    onUpdateValue(value ? value + character : character)
  }

  const animations = ['bounceInDown', 'bounceInUp', 'bounceInLeft', 'bounceInRight']
  const animation = animated ? `animated ${animations[Math.floor(Math.random() * animations.length)]}` : ''

  return (
    <div
      key={`char-${character}`}
      className={`action-button medium font-mono uppercase bold green ${animation}`}
      onClick={onClick}
    >
      {character}
    </div>
  )
}

const renderRemoveCharacterKey = (value, onUpdateValue, animated) => {
  const onClick = () => {
    onUpdateValue(value.slice(0, -1))
  }

  const animations = ['bounceInDown', 'bounceInUp', 'bounceInLeft', 'bounceInRight']
  const animation = animated ? `animated ${animations[Math.floor(Math.random() * animations.length)]}` : ''

  return (
    <div
      className={`action-button medium red icon no-text ${animation}`}
      onClick={onClick}
    >
      <i className="fa fa-chevron-circle-left" />
    </div>
  )
}

export {
  renderCharacterKey,
  renderRemoveCharacterKey,
}
