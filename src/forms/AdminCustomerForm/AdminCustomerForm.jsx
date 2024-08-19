import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useMainCustomerFormItems } from './AdminCustomerFormItem';
import { mainAppStyles } from '../../appStyles';
import FormikControl from '../../component/formik/FormikControl';
import { useDispatch } from 'react-redux';
import { addCustomer } from '../../store/thunks/customerThunk';




const AdminCustomerForm = ({ onClose }) => {
  const { t } = useTranslation();
  const mainCustomerFormItems = useMainCustomerFormItems();
  const dispatch = useDispatch();
  const [submitError, setSubmitError] = useState(null);

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
          onClose();  // Sadece başarılı ise formu kapat
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
                          <Typography sx={mainAppStyles.customerFormTitle}>Müşteri Ekleme Formu</Typography>
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
                          <Button
                              sx={{
                                  width: '100%',
                                  height: '70px',
                                  color: 'black'
                              }}
                              type="submit"
                              disabled={!formik.isValid}
                          >
                              {t('submitButton')}
                          </Button>
                      </Form>
                  </Box>
              )}
          </Formik>
      </Box>
  );
};

export default AdminCustomerForm;
