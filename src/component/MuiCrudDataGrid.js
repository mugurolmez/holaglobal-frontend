import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Box, Snackbar, Alert } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { randomId } from '@mui/x-data-grid-generator';
import dayjs from 'dayjs';

const formatDateForBackend = (date) => date ? dayjs(date).format('YYYY-MM-DD') : null;
const formatDateForGrid = (date) => date ? dayjs(date).toDate() : null;

const MuiCrudDataGrid = ({ columns, dispatchers, validationSchema }) => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  const handleAddClick = () => {
    const id = randomId(); // Benzersiz ID oluşturun

    const newRow = columns.reduce((acc, col) => {
      acc[col.field] = col.type === 'date' ? new Date(dayjs().format('YYYY-MM-DD')) : '';
      return acc;
    }, { id, isNew: true });

    setRows((oldRows) => [...oldRows, newRow]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: columns[0]?.field },
    }));
  };

  const handleSaveClick = async (id) => {
    const rowToSave = rows.find(row => row.id === id);
    const formattedRow = { ...rowToSave };
    
    columns.forEach(column => {
      if (column.type === 'date') {
        formattedRow[column.field] = formatDateForBackend(rowToSave[column.field]);
      }
    });

    const idKeyField = columns.find(column => column.isIdKey)?.field;
    const idValue = formattedRow[idKeyField];

    try {
      await validationSchema.validate(formattedRow, { abortEarly: false });
      const action = idValue ? dispatchers.update : dispatchers.add;
      const result = await dispatch(action(formattedRow));

      if (result.response?.success) {
        const updatedRow = {
          ...formattedRow,
          dateOfBirth: formatDateForGrid(rowToSave.dateOfBirth),
          applicationDate: formatDateForGrid(rowToSave.applicationDate),
          id: idValue || result.response.customerId, // Backend'den gelen ID'yi kullan
          isNew: false,
        };

        setRows((prevRows) => prevRows.map((row) => (row.id === id ? updatedRow : row)));
        setSnackbarMessage(result.response.message);
        setSnackbarSeverity('success');
      } else {
        setSnackbarMessage(result.response.message || 'Bir hata oluştu.');
        setSnackbarSeverity('error');
      }
    } catch (error) {
      console.error('Error in handleSaveClick:', error);
      setSnackbarMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCancelClick = (id) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const columnsWithActions = [
    { field: 'id', headerName: 'ID', width: 90 },
    ...columns,
    {
      field: 'actions', type: 'actions', headerName: 'Actions', width: 100,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: 'primary.main' }}
              onClick={() => handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={() => handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Add"
            className="textPrimary"
            onClick={handleAddClick}
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
        columns={columnsWithActions}
        getRowId={(row) => row.id || randomId()} // Benzersiz ID sağlanması
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        onProcessRowUpdateError={(error) => console.error('Row update error:', error)}
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
};

export default MuiCrudDataGrid;
