import './index.css';
import React from 'react';

export default function Card({ title = 'Card Title', children }) {
  return (
    <div className="Card">
      <h2 className="Card__title">{title}</h2>
      {children}
    </div>
  );
}
