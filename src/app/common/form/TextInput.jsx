import React from 'react';
import { Form, Label } from 'semantic-ui-react';

const TextInput = props => {
    const {
        input,
        width,
        type,
        placeholder,
        meta: { touched, error }
    } = props;
    console.log('input', input);
    console.log('props', props);
    return (
        <Form.Field error={touched && !!error} width={width}>
            <input {...input} placeholder={placeholder} type={type} />
            {touched && error && (
                <Label basic color="red">
                    {error}
                </Label>
            )}
        </Form.Field>
    );
};

export default TextInput;
