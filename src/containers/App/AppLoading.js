import React from 'react'

const AppLoading = () => {
  const loadingSVG = require('./loading.svg')
  const loadingStyle = {
    height: 150,
    width: 300,
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-75px 0 0 -150px',
    backgroundImage: `url(${loadingSVG})`,
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    textAlign: 'center',
  }
  return (
    <div>
      <div style={loadingStyle} />
    </div>
  )
}

export default AppLoading
