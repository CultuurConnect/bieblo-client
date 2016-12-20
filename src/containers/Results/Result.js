import React from 'react'

const changeCoverSizeToMedium = (cover) => cover ? cover.replace('coversize=small', 'coversize=medium') : ''

const Result = ({result, colWidth, doShowDetails}) => {
  const coverUrl = changeCoverSizeToMedium(result.cover)
  const resultStyle = {
    backgroundImage: `url(${coverUrl})`,
  }
  const onClick = () => {
    doShowDetails(result)
  }

  return (
    <div className={`result-wrapper col-md-${colWidth}`}>
      <div className="result animated fadeIn" style={resultStyle} onClick={onClick}>
        {result.label}
      </div>
    </div>
  )
}

export default Result
