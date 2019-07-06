import React, { Component } from 'react';
import Script from 'react-load-script';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Form, Label } from 'semantic-ui-react';

class PlaceInput extends Component {
    state = {
        address: '',
        scriptLoaded: false
    };
    handleScriptLoaded = () => {
        this.setState({ scriptLoaded: true });
    };
    handleChange = address => {
        // this.setState({ address });
        // this.props.meta.setFieldTouched(address);
    };
    render() {
        const {
            input: { value, onChange, ...restInput },
            input,
            width,
            onSelect,
            placeholder,
            options,
            meta: { touched, error }
        } = this.props;

        console.log('props', this.props);
        return (
            <Form.Field error={touched && !!error} width={width}>
                <Script
                    url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAA924-ze-QJ8Er2ACLnCY6M2NmIRoMpnc&libraries=places"
                    onLoad={this.handleScriptLoaded}
                />

                {this.state.scriptLoaded && (
                    <PlacesAutocomplete
                        value={value}
                        {...restInput}
                        inputProps={{ ...restInput, placeholder }}
                        onChange={onChange}
                        onSelect={onSelect}
                        searchOptions={options}
                    >
                        {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps,
                            loading
                        }) => (
                            <div>
                                <input
                                    {...getInputProps({
                                        placeholder: placeholder,
                                        className: 'location-search-input',
                                        ...restInput
                                    })}
                                />
                                {touched && error && (
                                    <Label basic color="red">
                                        {error}
                                    </Label>
                                )}
                                <div
                                    className="autocomplete-dropdown-container"
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        zIndex: 1000,
                                        borderColor: '#96c8da',
                                        boxShadow:
                                            '0 2px 3px 0 rgba(34,36,38,.15)'
                                    }}
                                >
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? {
                                                  backgroundColor: '#fafafa',
                                                  cursor: 'pointer',
                                                  padding: '10px'
                                              }
                                            : {
                                                  backgroundColor: '#ffffff',
                                                  cursor: 'pointer',
                                                  padding: '10px'
                                              };
                                        return (
                                            <div
                                                {...getSuggestionItemProps(
                                                    suggestion,
                                                    {
                                                        className,
                                                        style
                                                    }
                                                )}
                                            >
                                                <span>
                                                    {suggestion.description}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                )}
            </Form.Field>
        );
    }
}

export default PlaceInput;
