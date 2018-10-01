import './index.css';
import React from 'react';
import getRandomNum from '../../util/random-num'

export default function ProgressBar( { data = [] } ) {
  const mapped = data.reduce( ( sum, bar ) => {
    sum.progress.push(
      <div className={`bar bar--${bar.color || 'gray'}`}
        style={{ width: `${bar.width}%` }}
        key={'bar-' + getRandomNum()} />
    )

    sum.legend.push(
      <div key={'legend-' + getRandomNum()}
        className={`legend-item legend-item--${bar.color || 'gray'}`}>
        {bar.title}: {bar.value}
      </div>
    )

    return sum
  }, {
      progress: [],
      legend: []
    } )

  return (
    <div className="ProgressBar">
      <div className="progress">
        {mapped.progress}
      </div>
      <div className="legend">
        {mapped.legend}
      </div>
    </div>
  );
}
