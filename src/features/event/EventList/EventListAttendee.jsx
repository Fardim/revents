import React, { Component } from 'react';
import { List, Image } from 'semantic-ui-react';

class EventListAttendee extends Component {
    state = {};
    render() {
        return (
            <List.Item>
                <Image
                    as="a"
                    size="mini"
                    circular
                    avatar
                    src="https://randomuser.me/api/portraits/women/42.jpg"
                />
            </List.Item>
        );
    }
}

export default EventListAttendee;
