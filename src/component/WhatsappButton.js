import React from 'react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { IconButton, Link, styled } from '@mui/material';

const FloatingIconButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const isMobileDevice = () => {
  return /Mobi|Android/i.test(navigator.userAgent);
};

// WhatsApp bağlantısını oluşturur
const handleWhatsAppClick = () => {
  const phoneNumber = '+905079117483';
  const whatsappURL = isMobileDevice()
    ? `https://wa.me/${phoneNumber}`
    : `https://web.whatsapp.com/send?phone=${phoneNumber}`;

  window.open(whatsappURL, '_blank');
};

const WhatsappButton = () => {
  return (
    <Link rel="noopener">
      <FloatingIconButton onClick={handleWhatsAppClick}
        sx={{
          backgroundColor: '#25D366',
          transition: 'background-color 0.3s, color 0.3s', // Geçiş efekti ekledik
          '&:hover': {
            backgroundColor: '#FFFFFF', // Hover durumunda arka plan rengini beyaz yap
          },

        }}>
        <WhatsAppIcon sx={{ 
           fontSize: {xs: '75px', sm: '100px', md: '120px', lg: '140px', xl: '170px' },
   
          color: 'white' ,
          transition: 'background-color 0.3s, color 0.3s', // Geçiş efekti ekledik
          '&:hover': {
            color: '#25D366',
          }
          }} 
          />
      </FloatingIconButton>
    </Link>
  )
}

export default WhatsappButton