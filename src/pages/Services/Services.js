import React from 'react'
import { Box, Typography } from '@mui/material';
import { mainServicesItems } from './ServicesItems';
import { useTranslation } from 'react-i18next';
import { mainAppStyles } from '../../appStyles';
import { DatePicker } from '@mui/x-date-pickers';
const Services = () => {
    const { t } = useTranslation();
    const items = mainServicesItems(t);
    return (
        <Box sx={mainAppStyles.pageTextBox}>
            <Typography textAlign={'center'} variant='h3'>
                {t('services.mainTitle')}
            </Typography>
            {items.map((item) => (
                <Box>
                    <Typography variant='h5'>
                        {item.title}

                    </Typography>
                    <Typography>
                        {item.content}
                    </Typography>
                </Box>
            ))

            }

             
                <DatePicker   sx={{
    '.MuiOutlinedInput-root': {
      backgroundColor: 'white',
    },
  }} />
           




        </Box>
    )
}

export default Services