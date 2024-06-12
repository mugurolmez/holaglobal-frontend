import React from 'react'
import { Box, Typography } from '@mui/material';
import { mainAppStyles } from '../../appStyles';
import CustomerForm from '../../forms/CustomerForm/CustomerForm';
import { mainForeingHealthInsuranceItems } from './ForeingHealthInsuranceItems';


const ForeingHealthInsurance = () => {
  return (
    <Box
      sx={mainAppStyles.pageBox}
    >
      <Box sx={mainAppStyles.pageFormBox}>
        <CustomerForm />
      </Box>

      <Box sx={mainAppStyles.pageTextBox}>
        {mainForeingHealthInsuranceItems.map((item) => (
          <Typography key={item.id} variant={item.variant}>
            {item.text}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}

export default ForeingHealthInsurance