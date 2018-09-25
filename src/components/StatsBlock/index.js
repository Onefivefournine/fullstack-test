import React from 'react';
import Point from '../Point';
import Label from '../Label';
import './index.css';
import getRandomNum from '../../util/random-num';
import fixFloats from '../../util/fix-floats';
import cutKilo from '../../util/cut-kilo';

export default class StatsBlock extends React.Component {
  constructor(props) {
    super(props);
    this.getDelta = this.getDelta.bind(this);
  }
  getDelta({ current, previous } = { current: 0, previous: 0 }) {
    let d = current / previous - 1;
    if (!d) return '-';
    return (d > 0 ? '+' : '') + fixFloats(d * 100, 0);
  }
  render() {
    return (
      <div className="StatsBlock">
        <div className="image-column">
          <div className="icon">
            <Point success={this.props.mainData.current > this.props.mainData.previous} />
            <img src={this.props.imageSrc} alt="img" className="icon__img" />
          </div>
          <img src="/assets/arrow.svg" alt="arrow" className="arrow" />
        </div>
        <div className="title-column">
          <h3 className="title">
            {this.props.title}
            {this.props.mainData.current && this.props.mainData.previous && this.props.mainData.current !== this.props.mainData.previous ? (
              <Label
                hasSuccess={this.props.mainData.current > this.props.mainData.previous}
                value={this.getDelta(this.props.mainData) + '%'}
              />
            ) : null}
          </h3>
          <div className="daily-stats">
            <span className="big-font">{cutKilo(this.props.mainData && this.props.mainData.current) || '-'}</span> Yesterday
          </div>
          <div className="daily-stats muted">
            <span className="big-font">{cutKilo(this.props.mainData && this.props.mainData.previous) || '-'}</span> Last friday
          </div>
        </div>
        <div className="desc-column">
          {this.props.headers.map(h => (
            <h3
              className={`header ${this.props.mainData.current < this.props.mainData.previous ? 'header--fail' : ''}`}
              key={'headers-' + getRandomNum()}
            >
              {h}
            </h3>
          ))}
          <div className="description muted">{this.props.description}</div>
          <div className="help">
            Help:&nbsp;
            {this.props.helpLinks.map((hl, i) => (
              <span key={'links-' + getRandomNum()}>
                <a className="link" href={hl.href}>
                  {hl.title}
                </a>
                {i !== this.props.helpLinks.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
