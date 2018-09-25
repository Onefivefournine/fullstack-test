import React from 'react';
import './index.css';

export default function Label({ value, hasSuccess }) {
  return <span className={`label label--${hasSuccess ? 'success' : 'fail'}`}>{value}</span>;
}
