import React from 'react';
import { connect } from 'react-redux';
import { fetchData, selectRadioBtn } from '../../actions';
import Card from '../Card';
import Loader from '../Loader';
import ProgressBar from '../ProgressBar';
import StatsBlock from '../StatsBlock';
import RadioButton from '../RadioButton';
import SummaryBlock from '../SummaryBlock';
import fixFloats from '../../util/fix-floats';
import cutKilo from '../../util/cut-kilo';
import './index.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.changeFilter = this.changeFilter.bind(this);
    this.getFilteredStatsProp = this.getFilteredStatsProp.bind(this);
  }
  componentDidMount() {
    this.props.fetchData();
  }
  getStatsData() {
    return (this.props.data && this.props.data.data && this.props.data.data[0]) || {};
  }
  changeFilter(value) {
    this.props.selectRadioBtn(value);
  }
  getFilteredStatsProp(prop, digits = 2) {
    return fixFloats(this.getStatsData()[prop + this.props.radioBtn.value], digits) || '-';
  }
  getBarData() {
    const COLORS = ['yellow', 'purple', 'blue', 'gray'];
    if (this.props.data && this.props.data['errors' + this.props.radioBtn.value]) {
      let currentData = this.props.data['errors' + this.props.radioBtn.value],
        total = currentData.reduce((sum, el) => sum + el.count, 0);

      currentData.sort((a, b) => b.count - a.count);

      return currentData.map((data, i) => {
        return {
          color: COLORS[i],
          width: (data.count * 100) / total,
          title: data.code ? `Error ${data.code}` : 'Other',
          value: data.count
        };
      });
    } else {
      return [];
    }
  }
  render() {
    return (
      <Card title="Main metrics">
        <div className="btn-group">
          <RadioButton
            isActive={this.props.radioBtn.value === '_last_hour'}
            value="_last_hour"
            content="Last hour"
            action={this.changeFilter}
          />
          <RadioButton isActive={this.props.radioBtn.value === '_today'} value="_today" content="Today" action={this.changeFilter} />
          <RadioButton
            isActive={this.props.radioBtn.value === '_yesterday'}
            value="_yesterday"
            content="Yesterday"
            action={this.changeFilter}
          />
          <RadioButton
            isActive={this.props.radioBtn.value === '_last_3days'}
            value="_last_3days"
            content="Last 3 days"
            action={this.changeFilter}
          />
        </div>
        <Loader show={this.props.isLoading} />
        {this.props.fetchError ? (
          <h3>{this.props.fetchErrorReason}</h3>
        ) : (
          <div className="content">
            <div className="summary">
              <SummaryBlock
                hasSuccess={this.getFilteredStatsProp('errors') < 5}
                title="Errors"
                value={this.getFilteredStatsProp('errors')}
                average={0.11}
              />
              <SummaryBlock
                hasSuccess={this.getFilteredStatsProp('zeroes') < 5}
                title="Zeroes"
                value={this.getFilteredStatsProp('zeroes')}
                average={0.11}
              />
              <SummaryBlock
                hasSuccess={this.getFilteredStatsProp('timeout') < 5}
                title="Timeouts"
                value={this.getFilteredStatsProp('timeout')}
                average={0.11}
              />
            </div>
            <ProgressBar barData={this.getBarData()} />
            <StatsBlock
              imageSrc="/assets/funnel.svg"
              title="Searches"
              mainData={{
                current: this.getFilteredStatsProp('searches_current'),
                previous: this.getFilteredStatsProp('searches_previous')
              }}
              headers={[
                `Mobile traffic: ${fixFloats(this.getStatsData().mobile_pessimizer)}%`,
                `Web traffic: ${fixFloats(this.getStatsData().web_pessimizer)}%`
              ]}
              description="You get 100% traffic on mobile and desktop devices"
              helpLinks={[
                {
                  href: '#',
                  title: 'Searches'
                },
                {
                  href: '#',
                  title: 'Pessimisation'
                }
              ]}
            />
            <StatsBlock
              imageSrc="/assets/click.svg"
              title="Clicks"
              mainData={{
                current: this.getFilteredStatsProp('clicks_current'),
                previous: this.getFilteredStatsProp('clicks_previous')
              }}
              headers={[`CTR: ${this.getFilteredStatsProp('ctr')}%`]}
              description="Conversion from searches to clicks on all devices"
              helpLinks={[
                {
                  href: '#',
                  title: 'CTR'
                },
                {
                  href: '#',
                  title: 'Clicks'
                }
              ]}
            />
            <StatsBlock
              imageSrc="/assets/cart.svg"
              title="Bookings"
              mainData={{
                current: this.getFilteredStatsProp('bookings_current'),
                previous: this.getFilteredStatsProp('bookings_previous')
              }}
              headers={[`STR: ${this.getFilteredStatsProp('str')}%`, `Avg.Check: ${cutKilo(this.getFilteredStatsProp('avg_price', 0))}`]}
              description="Conversion from clicks to bookings on all devices"
              helpLinks={[
                {
                  href: '#',
                  title: 'STR'
                },
                {
                  href: '#',
                  title: 'Bookings'
                },
                {
                  href: '#',
                  title: 'Avg. Check'
                }
              ]}
            />
          </div>
        )}
      </Card>
    );
  }
}

Dashboard = connect(
  ({ dashboard, radioBtn }) => ({ ...dashboard, radioBtn }),
  { fetchData, selectRadioBtn }
)(Dashboard);

export default Dashboard;
