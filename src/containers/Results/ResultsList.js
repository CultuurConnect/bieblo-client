import React from 'react'
import ResultsRow from './ResultsRow'

const MAX_ROWS = 2
const MAX_ITEMS_ROW = 4

const getResultsRowsFromResults = (resultsList) => {
  const resultsRows = []
  const resultsListCopy = [...resultsList]
  let i = 0
  while (resultsListCopy.length && resultsRows.length < MAX_ROWS) {
    const resultRow = []
    while (resultsListCopy.length && resultRow.length < MAX_ITEMS_ROW) {
      // const randomIdx = Math.floor(Math.random() * resultsListCopy.length)
      resultRow.push({
        ...resultsListCopy[i],
      })
      i += 1
      // resultsListCopy.splice(randomIdx, 1)
    }
    resultsRows.push(resultRow)
  }

  return resultsRows
}

const ResultsList = ({resultsList, doShowDetails}) => {
  const resultsRows = getResultsRowsFromResults(resultsList)

  return (
    <div className="results-list">
      {
        resultsRows.map(
          (resultRow, idx) =>
            <ResultsRow
              key={`results-row-${idx}`}
              resultRow={resultRow}
              doShowDetails={doShowDetails}
            />
        )
      }
    </div>
  )
}

export default ResultsList
