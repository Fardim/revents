import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import cuid from 'cuid';

const eventsDashboard = [
    {
        id: '1',
        title: 'Trip to Tower of London',
        date: '2018-03-27',
        category: 'culture',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
        city: 'London, UK',
        venue: "Tower of London, St Katharine's & Wapping, London",
        hostedBy: 'Bob',
        hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
        attendees: [
            {
                id: 'a',
                name: 'Bob',
                photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
            },
            {
                id: 'b',
                name: 'Tom',
                photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
            }
        ]
    },
    {
        id: '2',
        title: 'Trip to Punch and Judy Pub',
        date: '2018-03-28',
        category: 'drinks',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
        city: 'London, UK',
        venue: 'Punch & Judy, Henrietta Street, London, UK',
        hostedBy: 'Tom',
        hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
        attendees: [
            {
                id: 'b',
                name: 'Tom',
                photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
            },
            {
                id: 'a',
                name: 'Bob',
                photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
            }
        ]
    }
];

class EventDashboard extends Component {
    state = {
        events: eventsDashboard,
        isOpen: false,
        selectedEvent: null
    };
    handleFormOpen = () => {
        this.setState({ isOpen: true, selectedEvent: null });
    };
    handleEditEvent = eventToUpdate => {
        this.setState({ selectedEvent: eventToUpdate, isOpen: true });
    };
    handleCancel = () => {
        this.setState({ isOpen: false });
    };
    handleCreateEvent = newEvent => {
        newEvent.id = cuid();
        newEvent.hostPhotoURL = '/assets/user.png';
        const updatedEvents = [...this.state.events, newEvent];
        this.setState({ events: updatedEvents });
        console.log(updatedEvents);
    };
    render() {
        const { events, selectedEvent } = this.state;
        return (
            <div>
                <Grid>
                    <Grid.Column width={10}>
                        <EventList
                            events={events}
                            onEventEdit={this.handleEditEvent}
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
                            />
                        )}
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default EventDashboard;
