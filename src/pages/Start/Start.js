  import { Box, Button } from '@mui/material'
import { orange } from '@mui/material/colors'
  import React from 'react'
import { useTranslation } from 'react-i18next';

  const Start = () => {
    const { t } = useTranslation();
    return (
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',  // Elemanları dikey olarak hizalar
        justifyContent: 'top', // Dikey ortalama
        alignItems: 'center',     // Yatay ortalama
      }}
    >
     
  
     
      <Button 
  variant="contained" 
  sx={{ 
    borderRadius: '20px',    // Yumuşak köşeler
    px: 15,                  // Yatayda genişlik
    py: 1.5,                 // Dikeyde daha ince görünüm
    backgroundColor: orange, // Yarı şeffaf turuncu arka plan
    width:{md:'400px',xs:'250px'},
    height:{md:'240px',xs:'160px'},  
    fontSize: {md:'40px' } ,       // Yazı boyutu
   
       mr: '0.5vw',  
                 // Sağda 1vw boşluk
  }}  
>
{t('mainStartItems.Button1')}
        </Button>

        <Button 
  variant="contained" 
  sx={{ 
    borderRadius: '20px',    // Yumuşak köşeler
    px: 15,                  // Yatayda genişlik
    py: 1.5,                 // Dikeyde daha ince görünüm
    backgroundColor: orange, // Yarı şeffaf turuncu arka plan
    width:{md:'400px',xs:'250px'},
    height:{md:'240px',xs:'160px'},  
    fontSize: {md:'40px' } ,
       ml: '0.5vw',  
  }}  
>
{t('mainStartItems.Button2')}
        </Button>
      </Box>
 
    
    )
  }

  export default Start