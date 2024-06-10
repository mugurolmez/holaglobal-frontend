import React, { useEffect, useRef } from 'react';
import { ErrorMessage } from 'formik';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import TextError from './TextError';
import { mainAppStyles } from '../../appStyles';


function MuiCountrySelectField(props) {
    const { label, name, options, ...rest } = props;

    const selectRef = useRef(null);

    useEffect(() => {
        if (selectRef.current) {
            console.log('Select Props:', selectRef.current.props);
            console.log('Select Styles:', window.getComputedStyle(selectRef.current));
        }
    }, []);

    return (
        <div >
            <FormControl fullWidth>
                <InputLabel sx={{ color: 'black' }} htmlFor={name}>{label}</InputLabel>
                <Select select

                    sx={mainAppStyles.select}

                    id={name} name={name} label={label} {...rest}>
                    {options.map(option => (
                        <MenuItem sx={{ color: 'black' }} key={option.value} value={option.value}>
                            {option.key}
                           
                        </MenuItem>
                    ))}
                </Select>
                {console.log(Select.apply)}
            </FormControl>
            <ErrorMessage name={name} component={TextError} />
        </div>
    );
}

export default MuiCountrySelectField;
