import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import cuid from 'cuid';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    events: state.events
});

class EventDashboard extends Component {
    state = {
        isOpen: false,
        selectedEvent: null
    };

    handleFormOpen = () => {
        this.setState({ isOpen: true, selectedEvent: null });
    };
    handleOpenEvent = eventToOpen => {
        this.setState({ selectedEvent: eventToOpen, isOpen: true });
    };
    handleCancel = () => {
        this.setState({ isOpen: false });
    };
    handleCreateEvent = newEvent => {
        newEvent.id = cuid();
        newEvent.hostPhotoURL = '/assets/user.png';
        const updatedEvents = [...this.state.events, newEvent];
        this.setState({
            events: updatedEvents,
            isOpen: false,
            selectedEvent: null
        });
        console.log(updatedEvents);
    };
    handleUpdateEvent = eventToUpdate => {
        this.setState({
            events: this.state.events.map(event => {
                if (event.id === eventToUpdate.id) {
                    return Object.assign({}, eventToUpdate);
                    // return eventToUpdate; //It also works similarly
                } else {
                    return event;
                }
            }),
            isOpen: false,
            selectedEvent: null
        });
    };
    handleDeleteEvent = eventId => {
        const updatedEvents = this.state.events.filter(e => e.id !== eventId);
        this.setState({ events: updatedEvents });
    };
    render() {
        const { selectedEvent } = this.state;
        const { events } = this.props;
        return (
            <div>
                <Grid>
                    <Grid.Column width={10}>
                        <EventList
                            deleteEvent={this.handleDeleteEvent}
                            events={events}
                            onEventOpen={this.handleOpenEvent}
                        />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Button
                            positive
                            content="Create Event"
                            onClick={this.handleFormOpen}
                        />
                        {this.state.isOpen && (
                            <EventForm
                                selectedEvent={selectedEvent}
                                handleCancel={this.handleCancel}
                                createEvent={this.handleCreateEvent}
                                updateEvent={this.handleUpdateEvent}
                            />
                        )}
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default connect(mapStateToProps)(EventDashboard);
