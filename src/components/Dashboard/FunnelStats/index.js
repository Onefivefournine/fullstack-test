import React from 'react'
import StatsBlock from '../../StatsBlock';
import HELP_LINKS from '../../../util/help-links.json'

export default function FunnelStats( props ) {
    return ( props.data.map( ( { image, title, mainData, headers, description } ) => (
        <StatsBlock
            imageSrc={image}
            title={title}
            mainData={mainData}
            headers={headers}
            description={description}
            helpLinks={HELP_LINKS[ title.toLowerCase() ]}
        />
    ) ) )
}