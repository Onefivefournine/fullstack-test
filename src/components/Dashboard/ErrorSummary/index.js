import React from 'react'
import SummaryBlock from '../../SummaryBlock';
import getRandomNum from '../../../util/random-num';
const MIN_SUCCESS_POINT = 5

export default function ErrorSummary( props ) {
    return ( <div className="summary"
        key="summary">
        {props.data.map( ( { value, title, average } ) => (
            <SummaryBlock
                key={'summary-block-' + getRandomNum()}
                hasSuccess={value < MIN_SUCCESS_POINT}
                title={title}
                value={value}
                average={average}
            /> ) )}
    </div> )
}