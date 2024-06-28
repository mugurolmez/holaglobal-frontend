import React from 'react';
import { CssBaseline, ThemeProvider, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Routes, Route } from 'react-router-dom';
import { theme } from './component/Theme';
import { tr } from 'date-fns/locale';
import Navibar from './layouts/Navibar/Navibar';
import Home from './pages/Home/Home';
import ResidencePermits from './pages/ResidencePermits/ResidencePermits';
import Footer from './layouts/Footer/Footer';
import Header from './layouts/Header/Header';
import ForeingHealthInsurance from './pages/ForeignHealthInsurance/ForeingHealthInsurance';
import WhatsappButton from './component/WhatsappButton';
import Contact from './pages/Contact/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse/TermsOfUse';
import Faq from './pages/Faq/Faq';

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
            justifyContent: 'center',
            minHeight: '100vh',
            minWidth: '100%', // Kutunun tam ekran genişliğini kaplamasını sağlar
            padding: 0,
            margin: 0,
          }}
        >
          <Box maxWidth='xl' sx={{ width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '0 auto', minHeight: '100vh' }} >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                m: 0,
                p: 0,
                flex: '1 1 auto'
              }}
            >
              <Box
                sx={{
                  flex: '0 0 auto', // Yüksekliği sabitler
                 // Sabit yükseklik
                  width: '100%', // Genişlik tam ekran genişliğini kaplar
                }}
              >
                <Header />
              </Box>

              <Navibar />
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 1,
                  width: '100%', // Genişlik tam ekran genişliğini kaplar
                }}
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfUse />} />
                  <Route path="/faq" element={<Faq />} />
                  <Route path="/foreing-health-insurance" element={<ForeingHealthInsurance />} />
                  <Route path="/residence-permits/*" element={<ResidencePermits />} />
                </Routes>
              </Box>
              <Box>
                <Footer />
              </Box>
            </Box>
            <WhatsappButton />
          </Box>
        </Box>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
