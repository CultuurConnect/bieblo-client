import React from 'react'

const changeCoverSizeToMedium = (cover) => cover ? cover.replace('coversize=small', 'coversize=medium') : ''

const Result = ({result, colWidth}) => {
  console.log('???', result.cover)
  const coverUrl = changeCoverSizeToMedium(result.cover)
  const resultStyle = {
    backgroundImage: `url(${coverUrl})`,
  }
  console.log('cover Url', coverUrl)
  return (
    <div className={`result-wrapper col-md-${colWidth}`}>
      <div className="result" style={resultStyle}>
        {result.label}
      </div>
    </div>
  )
}

export default Result
