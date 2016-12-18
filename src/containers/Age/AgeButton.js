import React from 'react'

const AgeButton = ({age, cols}) => (
  <div className={`col-xs-6 col-md-${cols}`} style={{textAlign: 'center'}}>
    <div className="action-button green">
      {age.label}
    </div>
  </div>
)

export default AgeButton
