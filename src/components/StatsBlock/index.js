import React from 'react'
import Point from '../Point';
import './index.css'
import getRandomNum from '../../util/random-num';
export default function StatsBlock( { imageSrc, title, headers = [], datas = {}, description, helpLinks = [] } ) {
    return (
        <div className="stats-block">
            <div className="image-column">
                <div className="icon">
                    <Point success={true} />
                    <img src={imageSrc} alt="img" />
                </div>
            </div>
            <div className="title-column">
                <h3 className="title">{title} <span className="label">+{5}%</span> </h3>
                <div className="daily-stats"><span className="big-font">{29380}</span> Yesterday</div>
                <div className="daily-stats muted"><span className="big-font">{29380}</span> Last friday</div>
            </div>
            <div className="desc-column">
                {headers.map( h => <h3 key={'headers-' + getRandomNum()}>{h}</h3> )}
                <div className="description muted">{description}</div>
                <div className="help">
                    Help: {helpLinks.map( ( hl, i ) => (
                        <span key={'links-' + getRandomNum()}><a href={hl.href}>{hl.title}</a>
                            {i !== helpLinks.length - 1 ? ', ' : ''}</span>
                    ) )}
                </div>
            </div>

        </div>
    )

}
