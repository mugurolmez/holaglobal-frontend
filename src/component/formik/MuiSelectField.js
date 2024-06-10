import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import TextError from './TextError';
import { useField } from 'formik';
import { mainAppStyles } from '../../appStyles';

function MuiSelectField({ label, name, options, ...rest }) {
    const [field, meta] = useField(name);

    return (
        <Box sx={mainAppStyles.formItemBox}> 

      
        <FormControl fullWidth>
            <InputLabel sx={{ color: 'black' }} htmlFor={name}>{label}</InputLabel>
            <Select
                {...field}
                {...rest}
                id={name}
                label={label}
                error={meta.touched && meta.error}
            >
                {options.map(option => (
                    <MenuItem sx={{ color: 'black' }} key={option.value} value={option.value}>
                        {option.value}
                        {option.flag}
                    </MenuItem>
                ))}
            </Select>
            {meta.touched && meta.error && <TextError>{meta.error}</TextError>}
        </FormControl>
        </Box>
    );
}

export default MuiSelectField;
