import React from 'react'

const Theme = ({theme}) => {
  const imgStyleObj = {
    backgroundImage: `url(${theme.img})`,
  }
  return (
    <div
      key={`theme-${theme.id}`}
      id={`theme-${theme.id}`}
      className="theme"
    >
      <div className="label">{theme.label}</div>
      <div className="image" style={imgStyleObj} />
    </div>
  )
}

export default Theme
