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
    <Link  rel="noopener">
    <FloatingIconButton onClick={handleWhatsAppClick}>
      <WhatsAppIcon sx={{ fontSize: '170px' }} />
    </FloatingIconButton>
  </Link>
  )
}

export default WhatsappButton