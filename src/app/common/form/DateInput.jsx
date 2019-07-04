import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parseISO } from 'date-fns/esm';

const DateInput = ({
    input,
    width,
    placeholder,
    meta: { touched, error },
    ...rest
}) => {
    return (
        <Form.Field error={touched && !!error} width={width}>
            <DatePicker
                {...rest}
                placeholder={placeholder}
                selected={input.value ? parseISO(input.value) : null}
                onChange={date =>
                    input.onChange(format(date, 'yyyy-MM-dd HH:mm'))
                }
            />
            {touched && error && (
                <Label basic color="red">
                    {error}
                </Label>
            )}
        </Form.Field>
    );
};

export default DateInput;
