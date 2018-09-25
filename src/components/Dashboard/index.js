import React from 'react'
import { connect } from 'react-redux';
import { fetchData } from '../../actions';
import Card from '../Card'
import Loader from '../Loader'
import Point from '../Point'
import fixFloat from '../../util/fix-floats'
import './index.css'
import ProgressBar from '../ProgressBar';
import StatsBlock from '../StatsBlock';

class Dashboard extends React.Component {
    // constructor( props ) {
    //     super( props )

    // }
    componentDidMount() {
        this.props.fetchData()
    }
    getStatsData() {
        return ( this.props.data && this.props.data.data && this.props.data.data[ 0 ] ) || {}
    }
    getBarData() {
        return [ {
            color: 'yellow',
            width: 40,
            title: 'Error 500',
            value: 1256
        }, {
            color: 'purple',
            width: 30,
            title: 'Error 501',
            value: 800
        }, {
            color: 'blue',
            width: 20,
            title: 'Error 502',
            value: 650
        }, {
            color: 'gray',
            width: 10,
            title: 'Other',
            value: 330
        } ]
    }
    render() {
        return (
            <Card title="Main metrics">
                <div className="btn-group">
                    <button className="btn">Last hour</button>
                    <button className="btn">Today</button>
                    <button className="btn btn--active">Yesterday</button>
                    <button className="btn">Last 3 days</button>
                </div>
                <Loader show={this.props.isLoading} />
                {this.props.fetchError ? <h3>{this.props.fetchErrorReason}</h3> :
                    <div className="content">
                        <div className="err-summary">
                            <div className="block">
                                <Point success={true} />
                                <h3>
                                    Errors: {fixFloat( this.getStatsData().errors_yesterday )}% <br />
                                    <small className="muted">Average: {0.11}%</small>
                                </h3>
                            </div>
                            <div className="block">
                                <Point success={true} />
                                <h3>
                                    Zeroes: {0.12}% <br />
                                    <small className="muted">Average: {0.11}%</small>
                                </h3>
                            </div>
                            <div className="block">
                                <Point success={true} />
                                <h3>
                                    Timeouts: {0.12}% <br />
                                    <small className="muted">Average: {0.11}%</small>
                                </h3>
                            </div>
                        </div>
                        <ProgressBar barData={this.getBarData()} />
                        <StatsBlock
                            imageSrc='/assets/funnel.svg'
                            title="Searches"
                            headers={[ 'Mobile traffic: 100%', 'Web traffic: 100%' ]}
                            description="You get 100% traffic on mobile and desktop devices"
                            helpLinks={[ {
                                href: '#',
                                title: 'Searches'
                            }, {
                                href: '#',
                                title: 'Pessimisation'
                            } ]}
                        />
                        <StatsBlock
                            imageSrc='/assets/click.svg'
                            title="Clicks"
                            headers={[ 'CTR: 0.04%' ]}
                            description="Conversion from searches to clicks on all devices"
                            helpLinks={[ {
                                href: '#',
                                title: 'CTR'
                            }, {
                                href: '#',
                                title: 'Clicks'
                            } ]}
                        />
                        <StatsBlock
                            imageSrc='/assets/cart.svg'
                            title="Bookings"
                            headers={[ 'STR: 6.2%', 'Avg.Check: 8 903' ]}
                            description="Conversion from clicks to bookings on all devices"
                            helpLinks={[ {
                                href: '#',
                                title: 'STR'
                            }, {
                                href: '#',
                                title: 'Bookings'
                            }, {
                                href: '#',
                                title: 'Avg. Check'
                            } ]}
                        />
                    </div>
                }
            </Card>
        )
    }
}

Dashboard = connect( ( { dashboard } ) => ( { ...dashboard } ), { fetchData } )( Dashboard )

export default Dashboard