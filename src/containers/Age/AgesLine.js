import React from 'react'
import AgeButton from './AgeButton'

const AgesLine = ({ages}) => {
  const cols = 12 / ages.length
  return (
    <div className="row">
      {
        ages.map(
          age => <AgeButton
            key={`age-${age.id}`}
            age={age}
            cols={cols}
          />
        )
      }
    </div>
  )
}

export default AgesLine
