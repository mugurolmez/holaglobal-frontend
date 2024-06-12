import { Box, Typography } from '@mui/material'
import React from 'react'
import CustomerForm from '../../../../forms/CustomerForm/CustomerForm'
import { mainAppStyles } from '../../../../appStyles'
import { mainHumanitarianResidencePermitItems } from './HumanitarianResidencePermitItems'

const HumanitarianResidencePermit = () => {
  return (
    <Box
   sx={mainAppStyles.pageBox}
  >
    <Box sx={mainAppStyles.pageFormBox}>
      <CustomerForm />
    </Box>

    <Box sx={mainAppStyles.pageTextBox}>
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