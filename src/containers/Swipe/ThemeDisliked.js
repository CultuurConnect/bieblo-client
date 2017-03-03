import React from 'react'

const ThemeDisliked = ({theme}) => {
  const imgStyleObj = {
    backgroundImage: `url(${theme.img})`,
  }
  return (
    <div
      key={`theme-liked-${theme.id}`}
      id={`theme-${theme.id}`}
      className="theme disliked"
    >
      <div className="label">{theme.label}</div>
      <div className="image" style={imgStyleObj} />
    </div>
  )
}

export default ThemeDisliked
