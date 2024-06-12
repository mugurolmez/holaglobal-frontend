import { Box, Typography } from '@mui/material';
import React from 'react';
import { mainAppStyles } from '../../../../appStyles';
import CustomerForm from '../../../../forms/CustomerForm/CustomerForm';
import { mainEdicationResidencePermitItems } from './EdicationResidencePermitItems';
const EdicationResidencePermit = () => {

  return (
    <Box
   sx={mainAppStyles.pageBox}
  >
    <Box  sx={mainAppStyles.pageFormBox} width={{ xs: '100%', md: '40%'}} padding={2}>
      <CustomerForm />
    </Box>

    <Box sx={mainAppStyles.pageTextBox}>
    {mainEdicationResidencePermitItems.map((item) => (
          <Typography key={item.id} variant={item.variant}>
            {item.text}
          </Typography>
        ))}
    </Box>
  </Box>
)

}

export default EdicationResidencePermit