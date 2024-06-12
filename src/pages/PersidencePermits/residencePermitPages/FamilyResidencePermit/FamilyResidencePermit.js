import {  Box, Typography } from '@mui/material';
import React from 'react';
import CustomerForm from '../../../../forms/CustomerForm/CustomerForm'; // Yol düzeltildi
import { mainAppStyles } from '../../../../appStyles'; // Yol düzeltildi
import { mainFamilyResidencePermitItems } from './FamilyResidencePermitItems';


const FamilyResidencePermit = () => {
  return (
    <Box
   sx={mainAppStyles.pageBox}
  >
    <Box sx={mainAppStyles.pageFormBox}>
      <CustomerForm />
    </Box>

    <Box sx={mainAppStyles.pageTextBox}>
    {mainFamilyResidencePermitItems.map((item) => (
          <Typography key={item.id} variant={item.variant}>
            {item.text}
          </Typography>
        ))}
    </Box>
  </Box>
  
  );
};

export default FamilyResidencePermit;
