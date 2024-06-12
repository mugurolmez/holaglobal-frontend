import React from 'react';
import { CssBaseline, ThemeProvider, Box, Container } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Routes, Route } from 'react-router-dom';
import { theme } from './component/Theme';
import { tr } from 'date-fns/locale';
import Navibar from './layouts/Navibar/Navibar';
import Home from './pages/Home/Home';
import ResidencePermits from './pages/PersidencePermits/ResidencePermits';
import Footer from './layouts/Footer/Footer';
import Header from './layouts/Header/Header';
import ForeingHealthInsurance from './pages/ForeignHealthInsurance/ForeingHealthInsurance';
import WhatsappButton from './component/WhatsappButton';
import HealthInsuranceButton from './component/HealthInsuranceButton';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale={tr}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: '#212121',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
         
          
          }}
        >
          <Container sx={{maxWidth:'xl'}}>       
          <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box margin={1}>
                 <Header/>
            </Box>
         <Box margin={1}>
            <Navibar />
         </Box>
          
          </Box>
          <Box
       
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin:1
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/foreing-health-insurance" element={<ForeingHealthInsurance />} />
              <Route path="/residence-permits/*" element={<ResidencePermits />} />
            </Routes>
          </Box>
          <Box>
            <Footer />
          
          </Box>
          </Container>
        </Box>

         <HealthInsuranceButton />
            <WhatsappButton />
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
