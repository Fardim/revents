import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createEvent, updateEvent } from '../eventActions';
import cuid from 'cuid';

// const emptyEvent = {
//     title: '',
//     date: '',
//     city: '',
//     venue: '',
//     hostedBy: ''
// };
const mapStateToProps = (state, ownProps) => {
    const eventId = ownProps.match.params.id;
    let event = {
        title: '',
        date: '',
        city: '',
        venue: '',
        hostedBy: ''
    };
    if (eventId && state.events.length > 0) {
        event = state.events.filter(event => event.id === eventId)[0];
    }
    return { event };
};
const mapDispatchToActions = {
    createEvent,
    updateEvent
};
class EventForm extends Component {
    // state = {
    //     event: { ...emptyEvent }
    // };
    state = {
        event: Object.assign({}, this.props.event)
    };
    // componentDidMount() {
    //     if (this.props.selectedEvent != null) {
    //         this.setState({ event: this.props.selectedEvent });
    //     }
    // }
    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log('next', nextProps);
    //     console.log('prev', prevState);
    //     if (
    //         nextProps.selectedEvent !== prevState.event &&
    //         prevState.event.id &&
    //         nextProps.selectedEvent.id !== prevState.event.id
    //     ) {
    //         console.log('in');
    //         console.log('emptyEvent', emptyEvent);
    //         return {
    //             event: { ...nextProps.selectedEvent } || { ...emptyEvent }
    //         };
    //     } else {
    //         return null;
    //     }
    // }
    onFormSubmit = evt => {
        evt.preventDefault();
        if (this.state.event.id) {
            this.props.updateEvent(this.state.event);
            this.props.history.goBack();
        } else {
            const newEvent = {
                ...this.state.event,
                id: cuid(),
                hostPhotoURL: '/assets/user.png'
            };
            this.props.createEvent(newEvent);
            this.props.history.push('/events');
        }
    };
    onInputChange = evt => {
        const newEvent = this.state.event;
        newEvent[evt.target.name] = evt.target.value;
        this.setState({ event: newEvent });
    };
    render() {
        const { handleCancel } = this.props;
        const { event } = this.state;
        return (
            <Segment>
                <Form onSubmit={this.onFormSubmit}>
                    <Form.Field>
                        <label>Event Title</label>
                        <input
                            name="title"
                            onChange={this.onInputChange}
                            value={event.title}
                            placeholder="First Name"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Event Date</label>
                        <input
                            name="date"
                            onChange={this.onInputChange}
                            value={event.date}
                            type="date"
                            placeholder="Event Date"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>City</label>
                        <input
                            name="city"
                            onChange={this.onInputChange}
                            value={event.city}
                            placeholder="City event is taking place"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Venue</label>
                        <input
                            name="venue"
                            onChange={this.onInputChange}
                            value={event.venue}
                            placeholder="Enter the Venue of the event"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Hosted By</label>
                        <input
                            name="hostedBy"
                            onChange={this.onInputChange}
                            value={event.hostedBy}
                            placeholder="Enter the name of person hosting"
                        />
                    </Form.Field>
                    <Button positive type="submit">
                        Submit
                    </Button>
                    <Button type="button" onClick={this.props.history.goBack}>
                        Cancel
                    </Button>
                    {/* <Button type="button" onClick={handleCancel}>
                        Cancel
                    </Button> */}
                </Form>
            </Segment>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToActions
)(EventForm);
