import React from 'react'
import AgesLine from './AgesLine'

const NUM_AGES_LINE = 1

const sortAgesListReverse = (ageA, ageB) => {
  let result = 0
  if (ageA.age > ageB.age) {
    result = -1
  } else if (ageA.age < ageB.age) {
    result = 1
  }
  return result
}

const getAgeLinesFromAgeList = (agesList) => {
  const ageLines = []
  const agesListCopy = [...agesList]
  agesListCopy.sort(sortAgesListReverse)
  while (agesListCopy.length) {
    const line = []
    for (let i = 0; i < NUM_AGES_LINE; i++) {
      const item = agesListCopy.pop()
      if (item) {
        line.push(item)
      }
    }
    if (line.length) {
      ageLines.push(line)
    }
  }
  return ageLines
}

const AgesList = ({agesList, onAgeButtonClick, style}) => {
  const ageLines = getAgeLinesFromAgeList(agesList)
  return (
    <div className="ageList" style={style}>
      {
        ageLines.map(
          (ageLine, idx) =>
            <AgesLine
              key={`ageLine-${idx}`}
              ages={ageLine}
              onAgeButtonClick={onAgeButtonClick}
            />
        )
      }
    </div>
  )
}
export default AgesList
