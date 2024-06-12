import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { navibarStyles } from './styles';
import { mainNavbarItems } from './navibarItems';
import logo from '../../images/logo.png';
import { useNavigate } from 'react-router-dom';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Navibar = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={navibarStyles.box}>
      <Box sx={navibarStyles.logoBox}>
        <img src={logo} alt="Logo" width={'100%'} />
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <Tabs
          indicatorColor="primary"
          value={value}
          onChange={handleChange}
          centered
          sx={navibarStyles.tabs}
        >
          {mainNavbarItems.map((item) => (
            <Tab
              key={item.id}
              label={item.label}
              {...a11yProps(item.id)}
              sx={{
                ...navibarStyles.label,
                display: item.id === 0 ? { xs: 'none', sm: 'block' } : 'block', // Anasayfa tabını xs ekranlarda gizle
              }}
              onClick={() => navigate(item.route)}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};

export default Navibar;
