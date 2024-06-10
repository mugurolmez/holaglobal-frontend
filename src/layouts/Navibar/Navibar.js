import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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
    <Box sx={{ flexGrow: 1, backgroundColor: '#e94e1b' }}>

      <Grid container>
        <Grid item sx={navibarStyles.gridNavi}
          xs={2} md={1.3}>
          <Box maxWidth={'100px'} >
            <img src={logo} alt="Logo" width={'90%'} />
          </Box>
        </Grid>

        {/* Orta Sütun: Navbar */}
        <Grid item xs={10} md={10}
          sx={navibarStyles.gridLogo}
        >
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
                sx={navibarStyles.label}
                onClick={() => navigate(item.route)}
              />
            ))}
          </Tabs>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Navibar;
