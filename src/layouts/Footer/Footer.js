import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

const Footer = () => {


  return (
   
    <Box component="footer" py={4}  color="white">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">İletişim Bilgileri</Typography>
            <Typography variant='body2'>Adres: Örnek Sokak No: 1, İstanbul, Türkiye</Typography>
            <Typography variant='body2'>Telefon: +90 123 456 7890</Typography>
            <Typography variant='body2' >E-posta: info@example.com</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Hakkımızda</Typography>
            <Typography variant='body2' >Biz, yabancı ikamet izni ve sağlık sigortası konusunda uzmanlaşmış bir firmayız.</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Hızlı Erişim</Typography>
            <Link href="/" color="inherit">Ana Sayfa</Link><br/>
            <Link href="/services" color="inherit">Hizmetler</Link><br/>
            <Link href="/faq" color="inherit">SSS</Link><br/>
            <Link href="/contact" color="inherit">İletişim</Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Sosyal Medya</Typography>
            <Link href="https://facebook.com" color="inherit">Facebook</Link><br/>
            <Link href="https://twitter.com" color="inherit">Twitter</Link><br/>
            <Link href="https://linkedin.com" color="inherit">LinkedIn</Link><br/>
            <Link href="https://instagram.com" color="inherit">Instagram</Link>
          </Grid>
        </Grid>
        <Box textAlign="center" pt={4}>
          <Typography variant="body2" >&copy; {new Date().getFullYear()} Hola! Global Tüm hakları saklıdır.</Typography>
          <Link href="/privacy" color="inherit">Gizlilik Politikası</Link> | 
          <Link href="/terms" color="inherit">Kullanım Şartları</Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
