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
import Contact from './pages/Contact/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse/TermsOfUse';
import Sss from './pages/SSS/Sss';

function App() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale={tr}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Box
          sx={{

            backgroundColor: '#212121',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',


          }}
        >
          <Container maxWidth='xl'>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                m: 0,
                p: 0
              }}
            >
                <Header />
                <Navibar />
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 1
                }}
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfUse />} />
                  <Route path="/SSS" element={<Sss />} />

                  <Route path="/foreing-health-insurance" element={<ForeingHealthInsurance />} />
                  <Route path="/residence-permits/*" element={<ResidencePermits />} />
                </Routes>
              </Box>

                <Footer />        

            </Box>
            <WhatsappButton />
          </Container>
        </Box>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
