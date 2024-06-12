import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { mainFooterItems } from './FooterItems';

const Footer = () => {
  return (
    <Box component="footer" py={4} color="white">
      <Container>
        <Grid container spacing={4}>
          {Object.values(mainFooterItems).map((section, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <Typography variant={section[0].variant}>{section[0].text}</Typography>
              {section.slice(1).map((item, itemIndex) => (
                <React.Fragment key={itemIndex}>
                  {item.href ? (
                    <Typography variant="body2" key={itemIndex}>
                      <Link href={item.href} color="inherit">{item.text}</Link>
                    </Typography>
                  ) : (
                    <Typography variant="body2" key={itemIndex}>
                      {item.text}
                    </Typography>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          ))}
        </Grid>
        <Box textAlign="center" pt={4}>
          <Typography variant="body2">&copy; {new Date().getFullYear()} Hola! Global Tüm hakları saklıdır.</Typography>
          <Link href="/privacy" color="inherit">Gizlilik Politikası</Link> |
          <Link href="/terms" color="inherit">Kullanım Şartları</Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
