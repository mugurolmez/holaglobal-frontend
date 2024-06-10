import { Box, Typography } from '@mui/material'
import React from 'react'
import CustomerForm from '../../../../forms/CustomerForm/CustomerForm'
import { mainAppStyles } from '../../../../appStyles'
import { mainHumanitarianResidencePermitItems } from './HumanitarianResidencePermitItems'

const HumanitarianResidencePermit = () => {
  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="flex-start"
    flexDirection={{ xs: 'column', md: 'row' }}
    sx={{ minHeight: '70vh' }}
    textAlign={'left'}
  >
    <Box sx={mainAppStyles.formBox} width={{ xs: '100%', md: '40%'}} padding={2}>
      <CustomerForm />
    </Box>

    <Box width={{ xs: '100%', md: '60%' }} padding={2}>
    {mainHumanitarianResidencePermitItems.map((item) => (
          <Typography key={item.id} variant={item.variant}>
            {item.text}
          </Typography>
        ))}
    </Box>
  </Box>
  )
}

export default HumanitarianResidencePermit