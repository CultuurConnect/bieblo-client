import React from 'react'
import {connect} from 'react-redux'

import * as biebloActions from 'redux/modules/bieblo'

const AgesList = [
  7,
  8,
  9,
  10,
  11,
]

const getAgeLines = (ages) => {
  const lines = []
  ages.reverse()
  while (ages.length) {
    const line = []
    for (let i = 0; i < 3; i++) {
      const item = ages.pop()
      if (item) {
        line.push(item)
      }
    }
    if (line.length) {
      lines.push(line)
    }
  }
  return lines
}

const renderAgeButton = (age, cols) => (
  <div className={`col-xs-6 col-md-${cols}`} style={{textAlign: 'center'}}>
    <div className="action-button green">
      {age}
    </div>
  </div>
)

const renderAgeLine = (ageLine) => {
  const cols = 12 / ageLine.length
  return (
    <div className="row">
      {ageLine.map(age => renderAgeButton(age, cols))}
    </div>
  )
}

@connect(
  state => ({
    illustrations: state.bieblo.illustrations,
  }),
  {...biebloActions}
)

export default class Ages extends React.Component {
  render() {
    return (
      <div>
        <h1 className="written align-center">Klik op jouw leeftijd!</h1>
        {getAgeLines(AgesList).map(ageLine => renderAgeLine(ageLine))}
      </div>
    )
  }
}
