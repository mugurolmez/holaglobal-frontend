import * as Yup from 'yup';
import { countries } from './CountriesItems';



export const useMainCustomerFormItems=[

    {
      id: 0,
      control: 'muiInput',
      type: 'name',
      label: 'Name',
      name: 'name',
      validationSchema: Yup.string().required('Name is required')
    },
    {
      id: 1,
      control: 'muiInput',
      type: 'lastname',
      label: 'Last Name',
      name: 'lastname',
      validationSchema: Yup.string().required('Last name is required')
    },
    {
      id: 2,
      control: 'datePicker',
      type: 'dateOfBirth',
      label: 'Date of Birth',
      name: 'dateOfBirth',
   
      validationSchema: Yup.date().typeError('geçersiz tarih formatı').required('Date of Birth is required')
    },
    {
      id: 3,
      control: 'muiInput',
      type: 'passportNumber',
      label: 'Passport Number',
      name: 'passportNumber',
      validationSchema: Yup.string().required('Passport Number is required')
    },
    {
      id: 4,
      control: 'muiInput',
      type: 'typeOfResidencePermit',
      label: 'Type of Residence Permit',
      name: 'typeOfResidencePermit',
      validationSchema: Yup.string().required('Type of Residence Permit is required')
    },
    {
      id: 5,
      control: 'muiInput',
      type: 'phoneNumber',
      label: 'Phone Number',
      name: 'phoneNumber',
      validationSchema: Yup.string().required('Phone Number is required')
    }, 
     {
      id: 6,
      control: 'muiSelectField',
      type: 'nationality',
      label: 'nationality',
      name: 'nationality',
      options:countries,
      validationSchema: Yup.string().required('Phone Number is required')
    },
 
  
]