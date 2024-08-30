import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { randomId } from '@mui/x-data-grid-generator';
import { Alert, Snackbar } from '@mui/material';
import dayjs from 'dayjs';

const formatDateForBackend = (date) => date ? dayjs(date).format('YYYY-MM-DD') : null;
const formatDateForGrid = (date) => date ? dayjs(date).toDate() : null;

const MuiCrudDataGridAuto = ({ columns, dispatchers, validationSchema, ...otherProps }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.customer.customerItems);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    dispatch(dispatchers.getAll());
  }, [dispatch, dispatchers]);

  useEffect(() => {
    if (Array.isArray(items)) {
      const formattedRows = items.map(item => {
        const formattedItem = { ...item };
        columns.forEach(column => {
          if (column.type === 'date') {
            formattedItem[column.field] = formatDateForGrid(item[column.field]);
          }
        });
        return {
          ...formattedItem,
          id: item[columns.find(column => column.isIdKey)?.field] || randomId(),
        };
      });
      setRows(formattedRows);
    }
  }, [items, columns]);


  const showSnackbar = (message, severity = 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleEditClick = useCallback((id) => {
    setRowModesModel(prevModel => ({ ...prevModel, [id]: { mode: GridRowModes.Edit } }));
  }, []);

  const handleSaveClick = useCallback(async (id) => {
    setRowModesModel(prevModel => ({ ...prevModel, [id]: { mode: GridRowModes.View } }));
  }, []);

  const handleDeleteClick = useCallback(async (id) => {
    setIsProcessing(true)
    const previousRows = [...rows]; // Mevcut verileri sakla

    try {
      // Silme işleminden önce listeyi güncelle
      setRows(prevRows => prevRows.filter(row => row.id !== id)); // Kullanıcıya hemen güncellenmiş listeyi göster

      // Silme işlemi
      const result = await dispatch(dispatchers.delete(id));

      if (result?.response?.success) {
        showSnackbar(result.response.message || 'Kayıt Silindi.', 'success');
      } else {
        // Backend'den olumsuz yanıt geldiyse eski veriyi geri yükle
        setRows(previousRows);
        showSnackbar(result.response?.message || 'Kayıt Silinemedi.');
      }
    } catch (error) {
      // Bir hata oluşursa eski veriyi geri yükle
      setRows(previousRows);
      console.error('Silme işlemi başarısız:', error);
      showSnackbar('Kayıt silme işlemi sırasında bir hata oluştu.');
    } finally {
      dispatch(dispatchers.getAll())
      setIsProcessing(false)
    }

  }, [dispatch, dispatchers, rows]);





  const handleCancelClick = useCallback((id) => {
    setRowModesModel(prevModel => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setRows(prevRows => prevRows.filter((row) => row.id !== id));
    }
  }, [rows]);

  const processRowUpdate = useCallback(async (newRow) => {
    setIsProcessing(true);

    // Veriyi formatla
    const formattedRow = { ...newRow };
    columns.forEach(column => {
      if (column.type === 'date') {
        formattedRow[column.field] = formatDateForBackend(newRow[column.field]);
      }
    });

    const idKeyField = columns.find(column => column.isIdKey)?.field;
    let idValue = formattedRow[idKeyField];

    try {
      await validationSchema?.validate(formattedRow, { abortEarly: false });

      let result;

      if (idValue) {
        // Güncelleme işlemi
        result = await dispatch(dispatchers.update(formattedRow));

      } else {
        // Ekleme işlemi

        result = await dispatch(dispatchers.add(formattedRow));

      }

      // `success` ve `message` bilgilerini tutarlı bir şekilde al
      const success = result?.response?.data?.success ?? result?.response?.success;
      const message = result?.response?.data?.message ?? result?.response?.message;


      if (success) {
        showSnackbar(message, 'success');
        // Verileri yeniden yükle
        await dispatch(dispatchers.getAll());

        columns.forEach(column => {
          if (column.type === 'date') {
            formattedRow[column.field] = formatDateForGrid(formattedRow[column.field]);
          }
        });


        return formattedRow; // Güncellenmiş satırı döndür
      } else {
        showSnackbar(message || 'Bir hata oluştu.');
        return null;
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        showSnackbar(error.errors.join(', '), 'error');
      } else {
        showSnackbar('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
      }
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [columns, dispatch, dispatchers, validationSchema]);


  const EditToolbar = ({ setRows, setRowModesModel }) => {
    const handleClick = () => {
      const id = randomId();

      const newRow = columns.reduce((acc, col) => {
        if (col.type === 'date') {
          acc[col.field] = new Date();
        } else if (col.type === 'singleSelect') {
          // `valueOptions`'ın ilk elemanını varsayılan olarak ayarla
          acc[col.field] = col.valueOptions ? col.valueOptions[0] : '';
        } else {
          acc[col.field] = '';
        }
        return acc;
      }, { id, isNew: true });

      setRows((oldRows) => [...oldRows, newRow]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: columns[0]?.field },
      }));
    };


    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick} disabled={isProcessing}>
          Kayıt Ekle
        </Button>
      </GridToolbarContainer>
    );
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
              disabled={isProcessing}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={() => handleCancelClick(id)}
              color="inherit"
              disabled={isProcessing}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"
            disabled={isProcessing}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
            disabled={isProcessing}
          />,
        ];
      },
    },
  ];
  const handleProcessRowUpdateError = (error) => {
    console.error('Row update error:', error);
  };
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
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        disableSelectionOnClick
        getRowId={(row) => row.id}
        {...otherProps}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Tüm Snackbar'lar üst orta kısımda görüntülenecek
        sx={{ width: '400px' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MuiCrudDataGridAuto;
