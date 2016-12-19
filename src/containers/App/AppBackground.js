import React from 'react'

const AppLoading = () => {
  const backgroundImg = require('./background_bw.png')
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImg})`,

  }
  return (
    <div id="appBackground" style={backgroundStyle} />
  )
}

export default AppLoading
