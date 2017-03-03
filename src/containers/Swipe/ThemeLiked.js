import React from 'react'

const ThemeLiked = ({theme}) => {
  const imgStyleObj = {
    backgroundImage: `url(${theme.img})`,
  }
  return (
    <div
      key={`theme-liked-${theme.id}`}
      id={`theme-${theme.id}`}
      className="theme liked"
    >
      <div className="label">{theme.label}</div>
      <div className="image" style={imgStyleObj} />
    </div>
  )
}

export default ThemeLiked
