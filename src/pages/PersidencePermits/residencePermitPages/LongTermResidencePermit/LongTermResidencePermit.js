import React from 'react'
import CustomerForm from '../../../../forms/CustomerForm/CustomerForm'
import { mainAppStyles } from '../../../../appStyles'
import { mainLongTermResidencePermitItems } from './LongTermResidencePermitItems'
import { Box, Typography } from '@mui/material'
const LongTermResidencePermit = () => {
  return (
    <Box
      sx={mainAppStyles.pageBox}
    >
      <Box sx={mainAppStyles.pageFormBox}>
        <CustomerForm />
      </Box>

      <Box sx={mainAppStyles.pageTextBox}>
        {mainLongTermResidencePermitItems.map((item) => (
          <Typography key={item.id} variant={item.variant}>
            {item.text}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}

export default LongTermResidencePermit