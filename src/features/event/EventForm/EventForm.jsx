import React, { Component } from 'react';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createEvent, updateEvent } from '../eventActions';
import cuid from 'cuid';
import { reduxForm, Field } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import {
    composeValidators,
    combineValidators,
    isRequired,
    hasLengthGreaterThan
} from 'revalidate';
import DateInput from '../../../app/common/form/DateInput';
import { format } from 'date-fns/esm';

// const emptyEvent = {
//     title: '',
//     date: '',
//     city: '',
//     venue: '',
//     hostedBy: ''
// };
const category = [
    { key: 'drinks', text: 'Drinks', value: 'drinks' },
    { key: 'culture', text: 'Culture', value: 'culture' },
    { key: 'film', text: 'Film', value: 'film' },
    { key: 'food', text: 'Food', value: 'food' },
    { key: 'music', text: 'Music', value: 'music' },
    { key: 'travel', text: 'Travel', value: 'travel' }
];
const validate = combineValidators({
    title: isRequired({ message: 'The event title is required' }),
    category: isRequired({ message: 'Please provide a category' }),
    description: composeValidators(
        isRequired({ message: 'Please provide a description' }),
        hasLengthGreaterThan(4)({
            message: 'Description needs to be at least 5 characters'
        })
    )(),
    city: isRequired('city'),
    venue: isRequired('venue'),
    date: isRequired('date')
});
const mapStateToProps = (state, ownProps) => {
    const eventId = ownProps.match.params.id;
    let event = {};
    if (eventId && state.events.length > 0) {
        event = state.events.filter(event => event.id === eventId)[0];
        // event.date = new Date(event.date);
    }
    console.log(event);
    return { initialValues: event };
};
const mapDispatchToActions = {
    createEvent,
    updateEvent
};
class EventForm extends Component {
    // state = {
    //     event: { ...emptyEvent }
    // };
    // state = {
    //     event: Object.assign({}, this.props.event)
    // };
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
    onFormSubmit = values => {
        // evt.preventDefault();
        // values.date = format(values.date, 'yyyy-MM-dd HH:mm');
        // values.date = values.date.toString();
        console.log(values);
        if (this.props.initialValues.id) {
            this.props.updateEvent(values);
            this.props.history.goBack();
        } else {
            const newEvent = {
                ...values,
                id: cuid(),
                hostPhotoURL: '/assets/user.png',
                hostedBy: 'Bob'
            };
            console.log(newEvent);
            this.props.createEvent(newEvent);
            this.props.history.push('/events');
        }
    };
    // onInputChange = evt => {
    //     const newEvent = this.state.event;
    //     newEvent[evt.target.name] = evt.target.value;
    //     this.setState({ event: newEvent });
    // };
    render() {
        // const { handleCancel } = this.props;
        // const { event } = this.state;
        const { invalid, submitting, pristine } = this.props;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <Segment>
                        <Header sub color="teal" content="Event Details" />
                        <Form
                            onSubmit={this.props.handleSubmit(
                                this.onFormSubmit
                            )}
                        >
                            <Field
                                name="title"
                                type="text"
                                component={TextInput}
                                placeholder="Give your event a name"
                            />
                            <Field
                                name="category"
                                multiple={false}
                                component={SelectInput}
                                options={category}
                                placeholder="What is your event about"
                            />
                            <Field
                                name="description"
                                type="text"
                                rows={4}
                                component={TextArea}
                                placeholder="Tell us about your event"
                            />
                            <Header
                                sub
                                color="teal"
                                content="Event Location Details"
                            />
                            <Field
                                name="city"
                                type="text"
                                component={TextInput}
                                placeholder="Event City"
                            />
                            <Field
                                name="venue"
                                type="text"
                                component={TextInput}
                                placeholder="Event Venue"
                            />
                            <Field
                                name="date"
                                type="text"
                                component={DateInput}
                                placeholder="Date and Time of Event"
                                dateFormat="yyyy-MM-dd HH:mm"
                                showTimeSelect
                                timeFormat="HH:mm"
                            />
                            {/* <Form.Field>
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
                            </Form.Field> */}
                            <Button
                                positive
                                type="submit"
                                disabled={invalid || submitting || pristine}
                            >
                                Submit
                            </Button>
                            <Button
                                type="button"
                                onClick={this.props.history.goBack}
                            >
                                Cancel
                            </Button>
                            {/* <Button type="button" onClick={handleCancel}>
                                Cancel
                            </Button> */}
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToActions
)(
    reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(
        EventForm
    )
);
