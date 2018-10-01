import './index.css';
import React from 'react';
import Point from '../Point';

export default function SummaryBlock( { title, hasSuccess = false, value = 0, average = 0 } ) {
  return (
    <div className="block">
      <Point success={hasSuccess} />
      <h3>
        {title}: {value}% <br />
        <small className="muted">Average: {average}%</small>
      </h3>
    </div>
  );
}
