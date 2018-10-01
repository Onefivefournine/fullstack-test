import './index.css';
import React from 'react';
import Point from '../Point';
import Label from '../Label';
import fixFloats from '../../util/fix-floats'
import cutKilo from '../../util/cut-kilo'
import getRandomNum from '../../util/random-num'

export default class StatsBlock extends React.Component {
  constructor( props ) {
    super( props );
    this.getDelta = this.getDelta.bind( this );
  }

  getDelta( { current, previous } = { current: 0, previous: 0 } ) {
    let d = current / previous - 1;
    if ( !d ) return '-';
    return ( d > 0 ? '+' : '' ) + fixFloats( d * 100, 0 );
  }

  render() {
    const current = this.props.mainData && this.props.mainData.current
    const previous = this.props.mainData && this.props.mainData.previous

    return (
      <div className="StatsBlock">
        <div className="image-column">
          <div className="icon">
            <Point success={current > previous} />
            <img src={this.props.imageSrc} alt="img" className="icon__img" />
          </div>
          <img src="/assets/arrow.svg" alt="arrow" className="arrow" />
        </div>
        <div className="title-column">
          <h3 className="title">
            {this.props.title}
            {current !== previous ? (
              <Label
                hasSuccess={current > previous}
                value={this.getDelta( { current, previous } ) + '%'}
              />
            ) : null}
          </h3>
          <div className="daily-stats">
            <span className="big-font">{cutKilo( current ) || '-'}</span> Yesterday
          </div>
          <div className="daily-stats muted">
            <span className="big-font">{cutKilo( previous ) || '-'}</span> Last friday
          </div>
        </div>
        <div className="desc-column">
          {this.props.headers.map( h => (
            <h3 className={`header ${current < previous ? 'header--fail' : ''}`}
              key={'headers-' + getRandomNum()}>
              {h}
            </h3>
          ) )}
          <div className="description muted">{this.props.description}</div>
          <div className="help">
            Help:&nbsp;
            {this.props.helpLinks.map( ( hl, i ) => (
              <span key={'links-' + getRandomNum()}>
                <a className="link" href={hl.href}>
                  {hl.title}
                </a>
                {i !== this.props.helpLinks.length - 1 ? ', ' : ''}
              </span>
            ) )}
          </div>
        </div>
      </div>
    );
  }
}
