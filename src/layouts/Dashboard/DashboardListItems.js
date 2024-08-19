
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const mainListItems = (
    <React.Fragment>
        
      
        <ListItemButton>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="İkamet Başvuruları" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AddCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Sigorta Başvuruları" />
        </ListItemButton>
        
    </React.Fragment>
);
