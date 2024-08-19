import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridDeleteIcon, GridSaveAltIcon } from '@mui/x-data-grid';
import { trTR } from '@mui/x-data-grid/locales';
import { MenuItem, Select } from '@mui/material';

const handleSave = () => {
  console.log('kayıt edildi')
};
const handleDelete = () => {
  console.log('kayıt silindi')
};
const columns = [
  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    width: 150,
   
    getActions: (params) => [
      <GridActionsCellItem
        icon={<GridSaveAltIcon />}
        label="Save"
        onClick={() => handleSave(params.id)}
      />,
      <GridActionsCellItem
        icon={<GridDeleteIcon />}
        label="Delete"
        onClick={() => handleDelete(params.id)}
      />,
    ],
  },
    { field: 'id', headerName: 'ID' , flex: 1, },
    {
      field: 'name',
      headerName: 'Ad',
      editable: true,
    
    
    },
    {
      field: 'lastname',
      headerName: 'Soyad',
 
      editable: true,
   
    },
    {
      field: 'dateOfBirth',
      headerName: 'Doğum Tarihi',
   
      editable: true,
     
    },
    {
      field: 'passportNumber',
      headerName: 'Pasaport No',
     
      editable: true,

    },
    {
      field: 'typeOfResidencePermit',
      headerName: 'Başvuru Türü',
  
      editable: true,
  
    },
    {
      field: 'phoneNumber',
      headerName: 'Telefon Numarası',

      editable: true,
   
    },
    {
      field: 'nationality',
      headerName: 'Uyruk',
      editable: true,
 
    },
    {
      field: 'applicationDate',
      headerName: 'Başvuru Tarihi',
      editable: true,
   
    
    },
    {
      field: 'healthInsuranceNumber',
      headerName: 'Poliçe No',
      editable: true,
    
    },
    {
      field: 'state',
      headerName: 'Durum',

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
          <MenuItem  value="Beklemede">Beklemede</MenuItem>
          <MenuItem value="Onaylandı">Onaylandı</MenuItem>
          <MenuItem value="İptal">İptal</MenuItem>
        </Select>
      ),
    },
  ];
  
function MuiCustomersDataGrid({ rows, pageSize = 10, ...rest }) {
  return (
    <Box sx={{ width: '100%' }}>
      
      <DataGrid
       autosizeOptions={{
        includeOutliers: true,
        includeHeaders: true,
      }}
        rowHeight={50}
        localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
        sx={{ minHeight: '400px' }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize,
            },
          },
        }}
        pageSizeOptions={[10]}
        {...rest}
      />
    </Box>
  );
}

export default MuiCustomersDataGrid;
