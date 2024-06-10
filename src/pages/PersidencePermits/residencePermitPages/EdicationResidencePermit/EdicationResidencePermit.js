import { Box, Typography } from '@mui/material';
import React from 'react';
import { mainAppStyles } from '../../../../appStyles';
import CustomerForm from '../../../../forms/CustomerForm/CustomerForm';
import { mainEdicationResidencePermitItems } from './EdicationResidencePermitItems';
const EdicationResidencePermit = () => {

  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="top"
    flexDirection={{ xs: 'column', md: 'row' }}
    sx={{ backgroundColor: '#212121', minHeight: '70vh' }}
    textAlign={'left'}
  >
    <Box  sx={mainAppStyles.formBox} width={{ xs: '100%', md: '40%'}} padding={2}>
      <CustomerForm />
    </Box>

    <Box width={{ xs: '100%', md: '60%' }} padding={2}>
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