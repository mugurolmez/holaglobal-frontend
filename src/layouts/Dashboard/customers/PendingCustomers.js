import React from 'react';

import {customerColumns,customerDispatchers,validationSchema } from './pendingCustomerItems';
import MuiCrudDataGridAuto from '../../../component/MuiCrudDataGridAuto';

export default function PendingCustomers() {
  return (
    <MuiCrudDataGridAuto
      columns={customerColumns}
      dispatchers={customerDispatchers}
      validationSchema={validationSchema}
    />
  );
}
