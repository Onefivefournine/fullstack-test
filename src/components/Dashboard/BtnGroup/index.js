import './index.css'
import React from 'react'
import RadioButton from '../../RadioButton';

export default function ( { data, currentValue } ) {
    return ( <div className="btn-group">
        {data.map( ( ( { value, label, action } ) => (
            <RadioButton
                isActive={currentValue === value}
                value={value}
                label={label}
                action={action}
            />
        ) ) )}
    </div> )
}