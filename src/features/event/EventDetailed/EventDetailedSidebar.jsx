import React from 'react';
import { Segment, Item, Label } from 'semantic-ui-react';

const EventDetailedSidebar = props => {
    const { attendees } = props;
    const isHost = false;
    return (
        <React.Fragment>
            <Segment
                textAlign="center"
                style={{ border: 'none' }}
                attached="top"
                secondary
                inverted
                color="teal"
            >
                {attendees && attendees.length}{' '}
                {attendees && attendees.length === 1 ? 'Person' : 'People'}{' '}
                Going
            </Segment>
            <Segment attached>
                <Item.Group divided>
                    {attendees &&
                        attendees.map(attendee => (
                            <Item
                                style={{ position: 'relative' }}
                                key={attendee.id}
                            >
                                {isHost && (
                                    <Label
                                        style={{ position: 'absolute' }}
                                        color="orange"
                                        ribbon="right"
                                    >
                                        Host
                                    </Label>
                                )}

                                <Item.Image
                                    size="tiny"
                                    src={attendee.photoURL}
                                />
                                <Item.Content verticalAlign="middle">
                                    <Item.Header as="h3">
                                        {attendee.name}
                                    </Item.Header>
                                </Item.Content>
                            </Item>
                        ))}
                </Item.Group>
            </Segment>
        </React.Fragment>
    );
};

export default EventDetailedSidebar;
