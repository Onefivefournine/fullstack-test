import './index.css';
import React from 'react';
import { connect } from 'react-redux';
import { fetchData, selectRadioBtn } from '../../actions';
import ErrorSummary from './ErrorSummary';
import FunnelStats from './FunnelStats';
import Card from '../Card';
import Loader from '../Loader';
import ProgressBar from '../ProgressBar';
import fixFloats from '../../util/fix-floats'
import cutKilo from '../../util/cut-kilo'
import BtnGroup from './BtnGroup';


class Dashboard extends React.Component {
  constructor( props ) {
    super( props );

    this.getBtnGroupData = this.getBtnGroupData.bind( this )
    this.getErrorSummaryData = this.getErrorSummaryData.bind( this )
    this.getBarData = this.getBarData.bind( this )
    this.getFunnelData = this.getFunnelData.bind( this )
  }

  componentDidMount() {
    this.props.fetchData();
  }

  getStatsData() {
    return ( this.props.data && this.props.data.data && this.props.data.data[ 0 ] ) || {};
  }

  getFilteredStatsProp( prop, digits = 2 ) {
    return fixFloats( this.getStatsData()[ prop + this.props.radioBtn.value ], digits ) || '-';
  }

  getBtnGroupData() {
    return [ {
      value: "_last_hour",
      label: "Last hour",
      action: this.props.selectRadioBtn
    }, {
      value: "_today",
      label: "Today",
      action: this.props.selectRadioBtn
    }, {
      value: "_yesterday",
      label: "Yesterday",
      action: this.props.selectRadioBtn
    }, {
      value: "_last_3days",
      label: "Last 3 days",
      action: this.props.selectRadioBtn
    } ]
  }

  getErrorSummaryData() {
    return [ {
      title: 'Errors',
      value: this.getFilteredStatsProp( 'errors' ),
      average: 0.11, // ??? no data in json, so I left it hardcoded
    }, {
      title: 'Zeroes',
      value: this.getFilteredStatsProp( 'zeroes' ),
      average: 0.11, // ??? no data in json, so I left it hardcoded
    }, {
      title: 'Timeouts',
      value: this.getFilteredStatsProp( 'timeout' ),
      average: 0.11, // ??? no data in json, so I left it hardcoded
    } ]
  }

  getBarData() {
    const COLORS = [ 'yellow', 'purple', 'blue', 'gray' ];
    let currentData = this.props.data && this.props.data[ 'errors' + this.props.radioBtn.value ]
    if ( currentData ) {
      let total = currentData.reduce( ( sum, el ) => sum + el.count, 0 );

      currentData.sort( ( a, b ) => b.count - a.count );

      return currentData.map( ( data, i ) => {
        return {
          color: COLORS[ i ],
          width: ( data.count * 100 ) / total,
          title: data.code ? `Error ${data.code}` : 'Other',
          value: data.count
        };
      } );
    } else {
      return [];
    }
  }

  getFunnelData() {
    let statsData = this.getStatsData()
    return [ {
      image: "/assets/funnel.svg",
      title: "Searches",
      mainData: {
        current: this.getFilteredStatsProp( 'searches_current' ),
        previous: this.getFilteredStatsProp( 'searches_previous' )
      },
      headers: [
        `Mobile traffic: ${fixFloats( statsData.mobile_pessimizer )}%`,
        `Web traffic: ${fixFloats( statsData.web_pessimizer )}%`
      ],
      description: "You get 100% traffic on mobile and desktop devices"
    }, {
      image: "/assets/click.svg",
      title: "Clicks",
      mainData: {
        current: this.getFilteredStatsProp( 'clicks_current' ),
        previous: this.getFilteredStatsProp( 'clicks_previous' )
      },
      headers: [ `CTR: ${this.getFilteredStatsProp( 'ctr' )}%` ],
      description: "Conversion from searches to clicks on all devices"
    }, {
      image: "/assets/cart.svg",
      title: "Bookings",
      mainData: {
        current: this.getFilteredStatsProp( 'bookings_current' ),
        previous: this.getFilteredStatsProp( 'bookings_previous' )
      },
      headers: [
        `STR: ${this.getFilteredStatsProp( 'str' )}%`,
        `Avg.Check: ${cutKilo( this.getFilteredStatsProp( 'avg_price', 0 ) )}`
      ],
      description: "Conversion from clicks to bookings on all devices"
    } ]
  }

  render() {
    return (
      <Card title="Main metrics">
        <Loader show={this.props.isLoading} />
        {!this.props.fetchError && !this.props.isLoading ? (
          <div className="content">
            <BtnGroup data={this.getBtnGroupData()} currentValue={this.props.radioBtn.value} />
            <ErrorSummary data={this.getErrorSummaryData()} />
            <ProgressBar data={this.getBarData()} />
            <FunnelStats data={this.getFunnelData()} />
          </div>
        ) :
          this.props.fetchError ? <h3>Error :( <br/> Reason: {this.props.fetchErrorReason}</h3> : null}
      </Card>
    );
  }
}

Dashboard = connect(
  ( { dashboard, radioBtn } ) => ( { ...dashboard, radioBtn } ),
  { fetchData, selectRadioBtn }
)( Dashboard );

export default Dashboard;
