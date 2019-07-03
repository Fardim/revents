import React from 'react';
import { Form, Label } from 'semantic-ui-react';

const TextArea = props => {
    const {
        input,
        rows,
        width,
        type,
        placeholder,
        meta: { touched, error }
    } = props;
    return (
        <Form.Field error={touched && !!error} width={width}>
            <textarea
                {...input}
                placeholder={placeholder}
                rows={rows}
                type={type}
            />
            {touched && error && (
                <Label basic color="red">
                    {error}
                </Label>
            )}
        </Form.Field>
    );
};

export default TextArea;
