import React, { Component } from 'react';
import { connect } from 'react-redux';
import Progress from '../progress';
import _ from 'lodash';
import EventCard from './event_card';

class EventsYouMayLike extends Component {
    renderThreeEvents(events) {
        const e = _.map(events, event => {
            return (
                <div key={event._id}>
                    <EventCard key={event._id} event={event} />
                </div>
            );
        });

        return e;
    }

    render() {
        const { events } = this.props;

        if (!events) return <Progress />;

        return (
            <div>
                {this.renderThreeEvents(events)}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        events: state.events
    };
}

export default connect(mapStateToProps)(EventsYouMayLike);
