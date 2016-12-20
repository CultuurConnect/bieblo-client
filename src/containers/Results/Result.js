import React from 'react'

const changeCoverSizeToMedium = (cover) => cover ? cover.replace('coversize=small', 'coversize=medium') : ''

const Result = ({result, colWidth}) => {
  const coverUrl = changeCoverSizeToMedium(result.cover)
  const resultStyle = {
    backgroundImage: `url(${coverUrl})`,
  }
  return (
    <div className={`result-wrapper col-md-${colWidth}`}>
      <div className="result animated fadeIn" style={resultStyle}>
        {result.label}
      </div>
    </div>
  )
}

export default Result
