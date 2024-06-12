import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { mainAppStyles } from '../../appStyles';
import { mainHomeTextItems } from './HomeItem';
import CustomerForm from '../../forms/CustomerForm/CustomerForm';

const Home = () => {

  return (

    <Box
     sx={mainAppStyles.pageBox}
    >
      <Box  sx={mainAppStyles.pageFormBox}>
   <CustomerForm/>
   
      </Box>

      <Box sx={mainAppStyles.pageTextBox}>
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
