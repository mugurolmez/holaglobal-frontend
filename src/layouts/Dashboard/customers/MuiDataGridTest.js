import React from 'react'
import { TestColumns,testCustomerDispatchers,validationSchema } from './MuiDataGridTestItems'
import MuiCrudDataGrid from '../../../component/MuiCrudDataGrid'
export default function MuiDataGridTest() {
  return (
    <MuiCrudDataGrid 
    columns={TestColumns}
    dispatchers={testCustomerDispatchers}
    validationSchema={validationSchema}
    />
  )
}
