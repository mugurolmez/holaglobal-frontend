// items/customerItems.js
import * as Yup from 'yup';
import { addCustomer, deleteCustomer, getAllCustomer, updateCustomer } from '../../../store/thunks/customerThunk';

export const stateOptions = ['Beklemede', 'Onaylandı', 'İptal'];

export const TestColumns = [

  { field: 'customerId', headerName: 'Customer ID', width: 180, editable: false, isIdKey: true },
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  { field: 'lastname', headerName: 'Lastname', width: 180, editable: true },
  { field: 'dateOfBirth', headerName: 'Date of Birth', type: 'date', width: 180, editable: true },
  { field: 'passportNumber', headerName: 'Passport Number', width: 180, editable: true },
  { field: 'typeOfResidencePermit', headerName: 'Residence Permit Type', width: 180, editable: true },
  { field: 'phoneNumber', headerName: 'Phone Number', width: 180, editable: true },
  { field: 'nationality', headerName: 'Nationality', width: 180, editable: true },
  { field: 'applicationDate', headerName: 'Application Date', type: 'date', width: 180 },
  { field: 'healthInsuranceNumber', headerName: 'Health Insurance Number', width: 180, editable: true },
  { field: 'state', headerName: 'State', width: 220, editable: true, type: 'singleSelect', valueOptions: stateOptions },
];

// Yup validation schema
export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  lastname: Yup.string().required('Lastname is required'),
  dateOfBirth: Yup.date().required('Date of Birth is required').typeError('Invalid date format'),
  passportNumber: Yup.string().required('Passport Number is required'),
  typeOfResidencePermit: Yup.string().required('Type of Residence Permit is required'),
  phoneNumber: Yup.string().required('Phone Number is required'),
  nationality: Yup.string().required('Nationality is required'),
  healthInsuranceNumber: Yup.string().nullable(),
  state: Yup.string().required('State is required'),
});

// Dispatch actions
export const testCustomerDispatchers = {
  add: addCustomer,
  update: updateCustomer,
  delete: deleteCustomer,
  getAll: getAllCustomer
};
