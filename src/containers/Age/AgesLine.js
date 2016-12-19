import React from 'react'
import AgeButton from './AgeButton'

const AgesLine = ({ages, onAgeButtonClick}) => {
  const cols = 12 / ages.length
  return (
    <div className="row">
      {
        ages.map(
          age => <AgeButton
            key={`age-${age.id}`}
            age={age}
            cols={cols}
            onAgeButtonClick={onAgeButtonClick}
          />
        )
      }
    </div>
  )
}

export default AgesLine
