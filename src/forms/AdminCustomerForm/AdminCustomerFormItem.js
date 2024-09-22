import * as Yup from 'yup';
import { countries } from '../CustomerForm/CountriesItems';
import { useTranslation } from 'react-i18next';


export const useMainCustomerFormItems = () => {
  
  const { t } = useTranslation();

  const residencePermitTypeOptions=[
    {id:0, value:t('mainTabItems.familyResidencePermit')},
    {id:1, value:t('mainTabItems.educationResidencePermit')},
    {id:2, value:t('mainTabItems.touristResidencePermit')},
    {id:3, value:t('mainTabItems.humanitarianResidencePermit')},
    {id:4, value:t('mainTabItems.shortTermResidencePermit')},
    {id:5, value:t('mainTabItems.longTermResidencePermit')},
  ]
  const state=[
    {id:0, value:'Beklemede'},
    {id:1, value:'Onaylandı'},
    {id:2, value:'İptal'},
    
  ]
  


  return [
    {
      id: 0,
      control: 'muiInput',
      type: 'name',
      label: t('name'),
      name: 'name',
      validationSchema: Yup.string().required(t('validation.nameRequired'))
    },
    {
      id: 1,
      control: 'muiInput',
      type: 'lastname',
      label: t('lastName'),
      name: 'lastname',
      validationSchema: Yup.string().required(t('validation.lastNameRequired'))
    },
    {
      id: 2,
      control: 'muiDatePicker',
      type: 'dateOfBirth',
      label: t('dateOfBirth'),
      name: 'dateOfBirth',
      validationSchema: Yup.date().typeError(t('validation.dateOfBirthInvalid')).required(t('validation.dateOfBirthRequired'))
    },
    {
      id: 3,
      control: 'muiInput',
      type: 'passportNumber',
      label: t('passportNumber'),
      name: 'passportNumber',
      validationSchema: Yup.string().required(t('validation.passportNumberRequired'))
    },
    {
      id: 4,
      control: 'muiSelectField',
      type: 'typeOfResidencePermit',
      label: t('typeOfResidencePermit'),
      name: 'typeOfResidencePermit',
      options: residencePermitTypeOptions,
      validationSchema: Yup.string().required(t('validation.typeOfResidencePermitRequired'))
    },
    {
      id: 5,
      control: 'muiInput',
      type: 'phoneNumber',
      label: t('phoneNumber'),
      name: 'phoneNumber',
      validationSchema: Yup.string().required(t('validation.phoneNumberRequired'))
    },
    {
      id: 6,
      control: 'muiSelectField',
      type: 'nationality',
      label: t('nationality'),
      name: 'nationality',
      options: countries,
      validationSchema: Yup.string().required(t('validation.nationalityRequired'))
    },
    {
      id: 7,
      control: 'muiInput',
      type: 'healthInsuranceNumber',
      label: 'Police No',
      name: 'healtInsuranceNumber',
      validationSchema: Yup.string().nullable()
    },
    {
      id: 8,
      control: 'muiSelectField',
      type: 'state',
      label: 'Durum',
      name: 'state',
      options: state,
      validationSchema: Yup.string().required("Durum Gerekli")
    },


  ];
};
