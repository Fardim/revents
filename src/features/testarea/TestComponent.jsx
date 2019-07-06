import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementCounter, decrementCounter } from './testActions';
import { Button, Icon } from 'semantic-ui-react';
import Script from 'react-load-script';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from 'react-places-autocomplete';
import GoogleMapReact from 'google-map-react';

const mapStateToProps = state => ({
    data: state.test.data
});
const mapDispatchToActions = {
    incrementCounter,
    decrementCounter
};
const Marker = () => <Icon name="marker" size="big" color="red" />;

class TestComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { address: '', scriptLoaded: false };
    }
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 15
    };
    // state = { address: '', scriptLoaded: false };
    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };
    handleScriptLoad = () => {
        this.setState({ scriptLoaded: true });
    };

    render() {
        const { incrementCounter, decrementCounter, data } = this.props;
        return (
            <div>
                {/* <Script
                    url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAA924-ze-QJ8Er2ACLnCY6M2NmIRoMpnc&libraries=places"
                    onLoad={this.handleScriptLoad}
                /> */}
                <h1>Test Area</h1>
                <h1>The result is: {data}</h1>
                <Button
                    onClick={incrementCounter}
                    color="green"
                    content="Increment"
                />
                <Button
                    onClick={decrementCounter}
                    color="red"
                    content="Decrement"
                />
                <br />
                {this.state.scriptLoaded && (
                    <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                    >
                        {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps
                        }) => (
                            <div>
                                <input
                                    {...getInputProps({
                                        placeholder: 'Search Places...',
                                        className: 'search-input'
                                    })}
                                />
                                <div className="autocomplete-container">
                                    {suggestions.map(suggestion => (
                                        <div
                                            {...getSuggestionItemProps(
                                                suggestion,
                                                {
                                                    className: `suggestion-item${
                                                        suggestion.active
                                                            ? ' suggestion-item--active'
                                                            : ''
                                                    }`
                                                }
                                            )}
                                        >
                                            <span>
                                                {suggestion.description}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                )}
                <div style={{ height: '300px', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{
                            key: 'AIzaSyAA924-ze-QJ8Er2ACLnCY6M2NmIRoMpnc'
                        }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                        <Marker
                            lat={59.955413}
                            lng={30.337844}
                            text="My Marker"
                        />
                    </GoogleMapReact>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToActions
)(TestComponent);
