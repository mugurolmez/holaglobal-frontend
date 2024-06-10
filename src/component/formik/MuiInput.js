import { ErrorMessage, Field } from 'formik';
import React from 'react';
import { Box, TextField } from '@mui/material';
import TextError from './TextError';
import { mainAppStyles } from '../../appStyles';

function MuiInput(props) {
    const { label, name, ...rest } = props;

    return (
     
        <Box sx={mainAppStyles.formItemBox}>
            <Field  name={name}>
                {({ field, form }) => (
                    <TextField sx={mainAppStyles.textField}
                        id={name}
                        label={label}
                        InputLabelProps={{ style: { color: 'black' } }}
                        InputProps={{ style: { backgroundColor: 'white' } }}
                        {...field}
                        {...rest}
                        error={form.errors[name] && form.touched[name]}
                        helperText={<ErrorMessage name={name} component={TextError} />}
                    />
                )}
            </Field>
        </Box>  
    );
}

export default MuiInput;
