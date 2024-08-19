import * as React from 'react';
import {
  DataGrid,
  useGridApiRef,
  GridActionsCellItem,
  gridClasses,
} from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { darken } from '@mui/material/styles';
import { MenuItem, Select } from '@mui/material';

export default function ColumnAutosizing() {
  const customers = useSelector((state) => state.customer.customerItems.data);
  const [hasUnsavedRows, setHasUnsavedRows] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const apiRef = useGridApiRef();
  const unsavedChangesRef = React.useRef({
    unsavedRows: {},
    rowsBeforeChange: {},
  });

  const columns = React.useMemo(() => {
    return [
      {
        field: 'actions',
        type: 'actions',
        getActions: ({ id, row }) => [
          <GridActionsCellItem
            icon={<RestoreIcon />}
            label="Discard changes"
            disabled={unsavedChangesRef.current.unsavedRows[id] === undefined}
            onClick={() => {
              apiRef.current.updateRows([
                unsavedChangesRef.current.rowsBeforeChange[id],
              ]);
              delete unsavedChangesRef.current.rowsBeforeChange[id];
              delete unsavedChangesRef.current.unsavedRows[id];
              setHasUnsavedRows(
                Object.keys(unsavedChangesRef.current.unsavedRows).length > 0,
              );
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              unsavedChangesRef.current.unsavedRows[id] = {
                ...row,
                _action: 'delete',
              };
              if (!unsavedChangesRef.current.rowsBeforeChange[id]) {
                unsavedChangesRef.current.rowsBeforeChange[id] = row;
              }
              setHasUnsavedRows(true);
              apiRef.current.updateRows([row]); // to trigger row render
            }}
          />,
        ],
      },
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'name',
        headerName: 'Ad',
        width: 150,
      
      },
      {
        field: 'lastname',
        headerName: 'Soyad',
        width: 150,
        
      },
      {
        field: 'dateOfBirth',
        headerName: 'Doğum Tarihi',
        width: 110,
       
      },
      {
        field: 'passportNumber',
        headerName: 'Pasaport No',
        width: 110,
     
      },
      {
        field: 'typeOfResidencePermit',
        headerName: 'Başvuru Türü',
        width: 160,
      },
      {
        field: 'phoneNumber',
        headerName: 'Telefon Numarası',
        width: 160,
      },
      {
        field: 'nationality',
        headerName: 'Uyruk',
      
    
      },
      {
        field: 'applicationDate',
        headerName: 'Başvuru Tarihi',
    
      
      },
      {
        field: 'healthInsuranceNumber',
        headerName: 'Poliçe No',
      },
      {
        field: 'state',
        headerName: 'Durum',
        width: 160,
        editable: true,
        
        renderEditCell: (params) => (
          <Select
            value={params.value || ''}
            onChange={(event) => params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: event.target.value,
            })}
            fullWidth
          >
            <MenuItem value="Beklemede">Beklemede</MenuItem>
            <MenuItem value="Onaylandı">Onaylandı</MenuItem>
            <MenuItem value="İptal">İptal</MenuItem>
          </Select>
        ),
      },
      // Diğer sütunları buraya ekleyebilirsiniz
    ];
  }, [unsavedChangesRef, apiRef]);

  const processRowUpdate = React.useCallback((newRow, oldRow) => {
    const rowId = newRow.id;

    unsavedChangesRef.current.unsavedRows[rowId] = newRow;
    if (!unsavedChangesRef.current.rowsBeforeChange[rowId]) {
      unsavedChangesRef.current.rowsBeforeChange[rowId] = oldRow;
    }
    setHasUnsavedRows(true);
    return newRow;
  }, []);

  const discardChanges = React.useCallback(() => {
    setHasUnsavedRows(false);
    Object.values(unsavedChangesRef.current.rowsBeforeChange).forEach((row) => {
      apiRef.current.updateRows([row]);
    });
    unsavedChangesRef.current = {
      unsavedRows: {},
      rowsBeforeChange: {},
    };
  }, [apiRef]);

  const saveChanges = React.useCallback(async () => {
    try {
      setIsSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSaving(false);
      const rowsToDelete = Object.values(
        unsavedChangesRef.current.unsavedRows,
      ).filter((row) => row._action === 'delete');
      if (rowsToDelete.length > 0) {
        rowsToDelete.forEach((row) => {
          apiRef.current.updateRows([row]);
        });
      }

      setHasUnsavedRows(false);
      unsavedChangesRef.current = {
        unsavedRows: {},
        rowsBeforeChange: {},
      };
    } catch (error) {
      setIsSaving(false);
    }
  }, [apiRef]);

  const getRowClassName = React.useCallback(({ id }) => {
    const unsavedRow = unsavedChangesRef.current.unsavedRows[id];
    if (unsavedRow) {
      if (unsavedRow._action === 'delete') {
        return 'row--removed';
      }
      return 'row--edited';
    }
    return '';
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: 8 }}>
        <LoadingButton
          disabled={!hasUnsavedRows}
          loading={isSaving}
          onClick={saveChanges}
          startIcon={<SaveIcon />}
          loadingPosition="start"
        >
          <span>Save</span>
        </LoadingButton>
        <Button
          disabled={!hasUnsavedRows || isSaving}
          onClick={discardChanges}
          startIcon={<RestoreIcon />}
        >
          Discard all changes
        </Button>
      </div>
      <div style={{ height: 400 }}>
        <DataGrid
          rows={customers}
          columns={columns}
          apiRef={apiRef}
          disableRowSelectionOnClick
          processRowUpdate={processRowUpdate}
          getRowClassName={getRowClassName}
          sx={{
            [`& .${gridClasses.row}.row--removed`]: {
              backgroundColor: (theme) => {
                if (theme.palette.mode === 'light') {
                  return 'rgba(255, 170, 170, 0.3)';
                }
                return darken('rgba(255, 170, 170, 1)', 0.7);
              },
            },
            [`& .${gridClasses.row}.row--edited`]: {
              backgroundColor: (theme) => {
                if (theme.palette.mode === 'light') {
                  return 'rgba(255, 254, 176, 0.3)';
                }
                return darken('rgba(255, 254, 176, 1)', 0.6);
              },
            },
          }}
          loading={isSaving}
        />
      </div>
    </div>
  );
}
