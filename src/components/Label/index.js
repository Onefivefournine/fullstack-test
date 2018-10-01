import './index.css';
import React from 'react';

export default function Label( { value, hasSuccess } ) {
  return <span className={`label label--${hasSuccess ? 'success' : 'fail'}`}>{value}</span>;
}
