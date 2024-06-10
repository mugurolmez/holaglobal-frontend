import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

function FixedButton() {
    const navigate = useNavigate();
    const handleClick=()=>{
        navigate('/foreing-health-insurance')
      }

    return (
        <Box
            sx={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: '1000', // Gerekirse, diğer öğelerin önünde olacak şekilde ayarlayabilirsiniz
            }}
        >
         
            <Button
          onClick={handleClick}
           sx={{
            height: { xs: '50px', sm: '60px', md: '70px', lg: '80px', xl: '90px' }, // Ekran boyutuna göre özel yükseklik
            width: { xs: '150px', sm: '200px', md: '250px', lg: '300px', xl: '350px' }, // Ekran boyutuna göre özel genişlik
            backgroundColor: '#212121',
            color: '#e94e1b',
            fontWeight: 'bold',
            borderRadius: '20px',
            borderColor: 'white', // Beyaz çerçeve rengi
            borderWidth: '2px', // Çerçeve kalınlığı
            borderStyle: 'solid', // Çerçeve stili
          }} 
         
          
          >Yabancı  Sağlık Sigortası

          </Button>
        
        </Box>
    );
}

export default FixedButton;
