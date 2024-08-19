import * as React from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCustomer } from '../../../store/thunks/customerThunk';
import MuiCustomersDataGrid from '../../../component/formik/MuiCustomersDataGrid';


export default function ApprovedCustomers() {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer.customerItems.data);

  React.useEffect(() => {
    dispatch(getAllCustomer());
  }, [dispatch]);

  const approvedCustomers = customers.filter(customer => customer.state === 'Onaylandı');

  return (
    <Box sx={{ width: '100%' }}>
      <MuiCustomersDataGrid rows={approvedCustomers}  pageSize={10} />
    </Box>
  );
}
