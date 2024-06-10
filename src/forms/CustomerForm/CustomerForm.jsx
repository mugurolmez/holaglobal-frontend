import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Typography } from '@mui/material';
import { useMainCustomerFormItems } from './CustomerFormItem';
import { mainAppStyles } from '../../appStyles';
import FormikControl from '../../component/formik/FormikControl';
import { useLocation } from 'react-router-dom';



const CustomerForm = () => {
  const location = useLocation();
  const formTitle=location.pathname.includes('foreing-health-insurance')
  ? 'Sigorta Başvuru Formu'
  :'Hızlı Başvuru Formu'

  const initialValues = useMainCustomerFormItems.reduce((acc, item) => {
    acc[item.name] = '';
    return acc;
  }, {});


  const validationSchema = useMainCustomerFormItems.reduce((acc, item) => {
    acc[item.name] = item.validationSchema;
    return acc;
  }, {});

  const onSubmit = values => {
    console.log('Form data', values);
  };

  return (
    <Box sx={mainAppStyles.formBox}>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={onSubmit}
      >
        {formik => (
          <Box sx={{ margin: '10px', alignItems: 'center', height: '100%' }}>
            <Form>
              <Typography sx={mainAppStyles.formTitle}>{formTitle}</Typography>
              {useMainCustomerFormItems.map(item => (
                <FormikControl
                  key={item.id}
                  control={item.control}
                  type={item.type}
                  label={item.label}
                  name={item.name}
                  options={item.options}
                />
              ))}
    
             
              <Button sx={mainAppStyles.button} type="submit" disabled={!formik.isValid}>
                Submit
              </Button>
            </Form>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default CustomerForm;
