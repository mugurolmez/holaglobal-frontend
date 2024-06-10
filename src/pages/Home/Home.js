import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { mainAppStyles } from '../../appStyles';
import { mainHomeTextItems } from './HomeItem';
import CustomerForm from '../../forms/CustomerForm/CustomerForm';

const Home = () => {

  return (

    <Box
      display="flex"
      justifyContent="center"
      alignItems="top"
      minHeight={'10vh'}
      flexDirection={{ xs: 'column', md: 'row' }}
      sx={{  minHeight: '70vh' }}
      textAlign={'left'}
    >
      <Box  sx={mainAppStyles.formBox} width={{ xs: '100%', md: '40%'}} padding={2}>
   <CustomerForm/>
   
      </Box>

      <Box width={{ xs: '100%', md: '60%' }} padding={2}>
      {mainHomeTextItems.map((item) => (
          <Typography key={item.id} variant={item.variant}>
            {item.text}
          </Typography>
        ))}
       
      </Box>
    </Box>
  );
};

export default Home;
