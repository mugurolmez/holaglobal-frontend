import { Box, Typography } from '@mui/material'
import React from 'react'
import CustomerForm from '../../../../forms/CustomerForm/CustomerForm'
import { mainAppStyles } from '../../../../appStyles'
import { mainTouristResidencePermitItems } from './TouristResidencePermitItems'

const TouristResidencePermit = () => {
  return (
    <Box
    sx={mainAppStyles.pageBox}
  >
    <Box sx={mainAppStyles.pageFormBox}>
      <CustomerForm />
    </Box>

    <Box sx={mainAppStyles.pageTextBox}>
    {mainTouristResidencePermitItems.map((item) => (
          <Typography key={item.id} variant={item.variant}>
            {item.text}
          </Typography>
        ))}
    </Box>
  </Box>
  )
}

export default TouristResidencePermit