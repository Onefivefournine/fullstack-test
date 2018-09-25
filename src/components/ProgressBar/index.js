import React from 'react'
import './index.css'
import getRandomNum from '../../util/random-num';
export default function ProgressBar( { barData = [] } ) {
    return (
        <div>
            <div className="progress">
                {
                    barData.map( bar => (
                        <div className={`bar bar--${bar.color || 'gray'}`}
                            style={( { width: bar.width + '%' } )} key={'bar-' + getRandomNum()}>

                        </div>
                    ) )
                }

            </div>

            <div className="legend">
                {
                    barData.map( bar => (
                        <div key={'legend-' + getRandomNum()} className={`legend-item legend-item--${bar.color || 'gray'}`}>
                            {bar.title}: {bar.value}
                        </div>
                    ) )
                }
            </div>
        </div>

    )
}