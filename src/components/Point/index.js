import React from 'react'
import './index.css'

export default function Point( { success = false } ) {
    return ( <svg height="14" width="14" className={`Point ${success ? 'Point--success' : 'Point--fail'}`}>
        <circle cx="7" cy="7" r="7" fill="#fff" />
        <circle cx="7" cy="7" r="5" className="colored-circle" />
    </svg>
    )
}