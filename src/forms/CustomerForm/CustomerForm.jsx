import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useMainCustomerFormItems } from './CustomerFormItem';
import { mainAppStyles } from '../../appStyles';
import FormikControl from '../../component/formik/FormikControl';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCustomer } from '../../store/thunks/customerThunk';



const CustomerForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [submitError, setSubmitError] = useState(null);
  const location = useLocation();

  const formTitle = location.pathname.includes('foreing-health-insurance')
    ? t('formTitleInsurance')
    : t('formTitleQuick');

  const mainCustomerFormItems = useMainCustomerFormItems(); 
  


  const initialValues = mainCustomerFormItems.reduce((acc, item) => {
    acc[item.name] = '';
    return acc;
  }, {});

  const validationSchema = mainCustomerFormItems.reduce((acc, item) => {
    acc[item.name] = item.validationSchema;
    return acc;
  }, {});

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitError(null);  // Önceki hatayı sıfırla
    try {
        await dispatch(addCustomer(values));
        resetForm();
    } catch (error) {
        setSubmitError(error.message || 'Müşteri Ekleme Hatası');
    }
    setSubmitting(false);
};

  return (
    <Box sx={mainAppStyles.formBox}>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={onSubmit}
      >
        {formik => (
          <Box sx={mainAppStyles.customerFormBox}>
            <Form>
              <Typography sx={mainAppStyles.customerFormTitle}>{formTitle}</Typography>
              {mainCustomerFormItems.map(item => (
                <FormikControl
                  key={item.id}
                  control={item.control}
                  type={item.type}
                  label={t(item.label)}
                  name={item.name}
                  options={item.options}
                />
              ))}
               {submitError && (
                              <Typography color="error">{submitError}</Typography>
                          )}
              <Button sx={mainAppStyles.button} type="submit" disabled={!formik.isValid}>
                {t('submitButton')}
              </Button>
            </Form>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default CustomerForm;
