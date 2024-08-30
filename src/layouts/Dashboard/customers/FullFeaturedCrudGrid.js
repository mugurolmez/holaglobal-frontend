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
import dayjs from 'dayjs';

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

// Helper Functions
const formatDateForBackend = (date) => date ? dayjs(date).format('YYYY-MM-DD') : null;
const formatDateForGrid = (date) => date ? dayjs(date).toDate() : null;

const setSnackbar = (setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen, message, severity) => {
  setSnackbarMessage(message);
  setSnackbarSeverity(severity);
  setSnackbarOpen(true);
};

const validateRow = async (row) => {
  try {
    await validationSchema.validate(row, { abortEarly: false });
  } catch (error) {
    const validationErrors = error.inner.reduce((acc, curr) => {
      acc[curr.path] = curr.message;
      return acc;
    }, {});
    return validationErrors;
  }
  return null;
};

const processRowUpdate = async (newRow, dispatch, setRows, setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen) => {
  if (!newRow.id) {
    setSnackbar(setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen, 'Güncellenmeye çalışılan satırda geçerli bir id yok.', 'error');
    return null;
  }

  const formattedRow = {
    ...newRow,
    dateOfBirth: formatDateForBackend(newRow.dateOfBirth),
    applicationDate: formatDateForBackend(newRow.applicationDate),
  };

  const validationErrors = await validateRow(formattedRow);
  if (validationErrors) {
    setSnackbar(setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen, 'Lütfen formu kontrol edin: ' + JSON.stringify(validationErrors), 'error');
    return null;
  }

  const hasCustomerId = !!formattedRow.customerId;

  try {
    const action = hasCustomerId ? updateCustomer : addCustomer;
    const result = await dispatch(action(formattedRow));

    if (result.response && result.response.success) {
      const updatedRow = {
        ...formattedRow,
        dateOfBirth: formatDateForGrid(newRow.dateOfBirth),
        applicationDate: formatDateForGrid(newRow.applicationDate),
        isNew: false
      };
      setRows((prevRows) => prevRows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      setSnackbar(setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen, result.response.message, 'success');
      return updatedRow;
    } else {
      const errorMessage = result.response?.message || 'Bir hata oluştu.';
      setSnackbar(setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen, errorMessage, 'error');
      return null;
    }
  } catch (error) {
    setSnackbar(setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen, 'Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
    return null;
  }
};

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
      dateOfBirth: new Date(dayjs().format('YYYY-MM-DD')),
      passportNumber: '',
      typeOfResidencePermit: '',
      phoneNumber: '',
      nationality: '',
      applicationDate: new Date(dayjs().format('YYYY-MM-DD')),
      healthInsuranceNumber: '',
      state: 'Beklemede',
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
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  React.useEffect(() => {
    dispatch(getAllCustomer());
  }, [dispatch]);

  React.useEffect(() => {
    if (Array.isArray(customers)) {
      setRows(customers.map(customer => ({
        ...customer,
        id: customer.customerId,
        dateOfBirth: customer.dateOfBirth ? new Date(customer.dateOfBirth) : null,
        applicationDate: customer.applicationDate ? new Date(customer.applicationDate) : null,
      })));
    } else {
      console.error('Customers data is not an array:', customers);
    }
  }, [customers]);

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
      setSnackbar(setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen, result.response.message, 'success');
    } else {
      setSnackbar(setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen, result.response.message, 'error');
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
    {
      field: 'dateOfBirth',
      headerName: 'Date of Birth',
      type: 'date',
      width: 180,
      editable: true,
    },
    { field: 'passportNumber', headerName: 'Passport Number', width: 180, editable: true },
    { field: 'typeOfResidencePermit', headerName: 'Residence Permit Type', width: 180, editable: true },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 180, editable: true },
    { field: 'nationality', headerName: 'Nationality', width: 180, editable: true },
    {
      field: 'applicationDate',
      headerName: 'Application Date',
      type: 'date',
      width: 180,
    },
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
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}

        processRowUpdate={(newRow) =>
          processRowUpdate(newRow, dispatch, setRows, setSnackbarMessage, setSnackbarSeverity, setSnackbarOpen)
        }
        onProcessRowUpdateError={handleProcessRowUpdateError}

      />
      <Snackbar
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
