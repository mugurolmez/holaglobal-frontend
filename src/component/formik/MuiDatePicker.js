import React from 'react';
import { ErrorMessage, Field } from 'formik';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import { mainAppStyles } from '../../appStyles';
import { Box } from '@mui/material';
import TextError from './TextError';


dayjs.locale('tr');
//hata mesajı goruntuleme sorunu araştırılacak
function MuiDatePicker(props) {
    const { label, name, ...rest } = props;
    return (

        <Box>
            <Field name={name}>
                {({ field, form }) => {
                    const { setFieldValue } = form;
                    const { value } = field;
                    
                    return (
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
                            <DatePicker
                                sx={mainAppStyles.datePicker}
                                label={label}
                                id={name}
                                {...rest}
                                value={value ? dayjs(value) : null}
                                onChange={(val) => {
                                    setFieldValue(name, val ? val.format('YYYY-MM-DD') : null);
                                }}
                            />
                        </LocalizationProvider>
                    );
                }}
            </Field>
            <ErrorMessage name={name} component={TextError}  ></ErrorMessage>
        </Box>
    );
}

export default MuiDatePicker;
