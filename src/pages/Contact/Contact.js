import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { mainAppStyles } from '../../appStyles';
import { useTranslation } from 'react-i18next';
import { mainContactItems } from './ContactItems';

const handleMapClick = () => {
  const mapLink = 'https://maps.app.goo.gl/yZxxeximYJYmHcA29';
  window.open(mapLink, '_blank');
};

const Contact = () => {
  const { t } = useTranslation();
  const items = mainContactItems(t);

  return (
    <Grid container spacing={2}>
      <Grid item lg={6} xs={12}>
        <Grid container spacing={2} direction="column">

          {items.map((item) => (
            <Grid key={item.id} item xs={12} sm={6}>
              <Box sx={mainAppStyles.contactBox}>
                <Box>
                  <a
                    href={item.type === 'phone' ? `tel:${item.content}` : `mailto:${item.content}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {item.icon}
                  </a>
                </Box>

                <Box display={'flex'} flexDirection={'column'}>
                  <Typography sx={{ variant: 'h5', fontWeight: 'bold' }}>
                    {item.title}
                  </Typography>

                  <Typography sx={{ variant: 'body1' }}>
                    {item.content}
                  </Typography>
                </Box>


              </Box>
            </Grid>


          ))}
        </Grid>
      </Grid>

      <Grid item lg={6} xs={12}>
        <Box sx={mainAppStyles.contactBox2}>
          <Typography sx={{ variant: 'h5', fontWeight: 'bold' }}>Yol Tarifi Alın</Typography>
          <Box sx={{ display: 'flex', cursor: 'pointer', height: '100%', width: '100%' }} onClick={handleMapClick}>
            <iframe
              title="Google Map"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCzzwjgZiZ92jmZ5e7XGrZS0l7Q6FG0YYo&q=https://maps.app.goo.gl/37TBVwiRCZJUi7vd8"
              allowFullScreen
            ></iframe>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Contact;
