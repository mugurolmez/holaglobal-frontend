import React from 'react'
import logo from '../../images/HOLA1.png'
import { Box, ImageListItem } from '@mui/material'
import { Link } from 'react-router-dom'
import { mainHeaderStyles } from './HeaderSytles'


const Header = () => {
  return (

    <Box sx={mainHeaderStyles.box} >
      <Link to="/home">
          <ImageListItem 
            sx={{
              width: { xs: '150px', sm: '250px', md: '300px', lg: '350px', xl: '400px' },
            }}
          >
            <img src={logo} alt="Logo" style={{ cursor: 'pointer' }} />
          </ImageListItem>
  
      </Link>
    </Box>

  );
}

export default Header