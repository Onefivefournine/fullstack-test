import React from 'react';

export default function RadioButton({ value = '', content = 'Button', isActive = false, action = v => v }) {
  return (
    <button className={'btn' + (isActive ? ' btn--active' : '')} onClick={() => action(value)}>
      {content}
    </button>
  );
}
