import React from 'react'
import { Shake } from 'reshake'

const AppTitle = () => (
  <div className="container">
    <Shake
      h={4}
      v={4}
      r={2}
      dur={450}
      int={10}
      max={100}
      fixed
      fixedStop={false}
      freez={false}>
      <h1 className="written align-center animated bounceInDown" style={{fontSize: 60, marginTop: 25}}>Bieblo</h1>
    </Shake>
    <hr />
  </div>
)

export default AppTitle
