import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer, deleteCustomer, getAllCustomer, updateCustomer } from '../../../store/thunks/customerThunk';
import * as Yup from 'yup';
import { Alert, Snackbar } from '@mui/material';

const validationSchema = Yup.object().shape({
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

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows,
    {
      id,
      customerId: '',
      name: '',
      lastname: '',
      dateOfBirth: '',
      passportNumber: '',
      typeOfResidencePermit: '',
      phoneNumber: '',
      nationality: '',
      applicationDate: '',
      healthInsuranceNumber: '',
      state: '',
      isNew: true
    }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer.customerItems);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('error');

  React.useEffect(() => {
    dispatch(getAllCustomer()); // Veriyi yükle
  }, [dispatch]);

  React.useEffect(() => {
    if (Array.isArray(customers)) {
      setRows(customers.map(customer => ({ ...customer, id: customer.customerId }))); // Redux'tan gelen veriyi rows'a ata
    } else {
      console.error('Customers data is not an array:', customers);
    }
  }, [customers]);

  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };


  const handleDeleteClick = (id) => async () => {
    const result = await dispatch(deleteCustomer(id));
    if (result?.response?.success) {
      setRows(rows.filter((row) => row.id !== id));
      setSnackbarMessage(result.response.message); // Mesajı ayarla
      setSnackbarSeverity('success'); // Başarı mesajı
      setSnackbarOpen(true);
    } else {
      console.error('Error deleting customer:', result.response?.message);
      setSnackbarMessage(result.response.message); // Mesajı ayarla
      setSnackbarSeverity('error'); // Başarı mesajı
      setSnackbarOpen(true);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    // Validate row data using Yup
    try {
      await validationSchema.validate(newRow, { abortEarly: false });
    } catch (error) {
      // Handle validation errors
      const validationErrors = error.inner.reduce((acc, curr) => {
        acc[curr.path] = curr.message;
        return acc;
      }, {});

      if (Object.keys(validationErrors).length > 0) {
        setSnackbarMessage('Lütfen formu kontrol edin: ' + JSON.stringify(validationErrors));
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return null;
      }

      return null;
    }

    // Check if the row has a valid id
    if (!newRow.id) {
      console.error('Güncellenmeye çalışılan satırda geçerli bir id yok.');
      setSnackbarMessage('Geçerli bir id bulunamadı. Satır güncellenemedi.'); // Mesajı ayarla
      setSnackbarSeverity('error'); // Başarı mesajı
      setSnackbarOpen(true);
      return null;
    }

    // Check if the row has a customerId
    const hasCustomerId = !!newRow.customerId;

    try {
      let result;
      if (hasCustomerId) {
        // Update customer
        result = await dispatch(updateCustomer(newRow));
      } else {
        // Add customer
        result = await dispatch(addCustomer(newRow));
      }

      if (result.response && result.response.success) {
        const updatedRow = { ...newRow, isNew: false };
        setRows((prevRows) =>
          prevRows.map((row) => (row.id === newRow.id ? updatedRow : row))
        );
        return updatedRow;
      } else {
        const errorMessage = result.response?.message || 'Bir hata oluştu.';
        console.error('API error:', errorMessage);
        

        if (result.response?.data) {
          Object.keys(result.response.data).forEach((key) => {
            console.error(`${key}: ${result.response.data[key]}`);
          });
        }
        setSnackbarMessage(errorMessage); // Mesajı ayarla
        setSnackbarSeverity('error'); // Başarı mesajı
        setSnackbarOpen(true);
        return null;
      }
    } catch (error) {
      console.error('API error:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
      return null;
    }
  }




  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const handleProcessRowUpdateError = (error) => {
    console.error('Row update error:', error);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 180, editable: false },
    { field: 'customerId', headerName: 'Customer ID', width: 180, editable: false },
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'lastname', headerName: 'Lastname', width: 180, editable: true },
    { field: 'dateOfBirth', headerName: 'Date of Birth', type: 'Date', width: 180, editable: true },
    { field: 'passportNumber', headerName: 'Passport Number', width: 180, editable: true },
    { field: 'typeOfResidencePermit', headerName: 'Residence Permit Type', width: 180, editable: true },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 180, editable: true },
    { field: 'nationality', headerName: 'Nationality', width: 180, editable: true },
    { field: 'applicationDate', headerName: 'Application Date', type: 'Date', width: 180, editable: true },
    { field: 'healthInsuranceNumber', headerName: 'Health Insurance Number', width: 180, editable: true },
    {
      field: 'state',
      headerName: 'State',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Beklemede', 'Onaylandı', 'İptal'],
    }, {
      field: 'actions', type: 'actions', headerName: 'Actions', width: 100, cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: 'primary.main' }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      /><Snackbar
      open={snackbarOpen}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
      sx={{ width: '400px' }} 
      onClose={() => setSnackbarOpen(false)}
    >
      <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
    
    </Box>

  );

}