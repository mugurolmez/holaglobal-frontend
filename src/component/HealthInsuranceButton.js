import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { mainAppStyles } from '../appStyles';

function HealthInsuranceButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/foreing-health-insurance')
  }

  return (
    <Box sx={mainAppStyles.healthInsuranceButtonBox}>

      <Button onClick={handleClick}
        sx={mainAppStyles.healthInsuranceButtonButton}
      >Yabancı  Sağlık Sigortası
      </Button>

    </Box>
  );
}

export default HealthInsuranceButton;
