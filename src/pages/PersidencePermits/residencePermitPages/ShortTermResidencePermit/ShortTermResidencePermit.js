import React from 'react'
import CustomerForm from '../../../../forms/CustomerForm/CustomerForm'
import { mainAppStyles } from '../../../../appStyles'
import { mainShortTermResidencePermitItems } from './ShortTermResidencePermitItems'
import { Box, Typography } from '@mui/material'

const ShortTermResidencePermit = () => {
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
    {mainShortTermResidencePermitItems.map((item) => (
          <Typography key={item.id} variant={item.variant}>
            {item.text}
          </Typography>
        ))}
    </Box>
  </Box>
  )
}

export default ShortTermResidencePermit