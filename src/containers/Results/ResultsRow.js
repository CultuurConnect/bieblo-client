import React from 'react'

import Result from './Result'

const ResultsRow = ({resultRow}) => {
  const colWidth = Math.floor(12 / resultRow.length)

  return (
    <div className="results-row row">
      {
        resultRow.map(
          result =>
            <Result
              key={`result-${result.id}`}
              result={result}
              colWidth={colWidth}
            />
        )
      }
    </div>
  )
}

export default ResultsRow
