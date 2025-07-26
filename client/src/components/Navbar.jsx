import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem,
  ListItemButton, ListItemText, Box, Button, useTheme, useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CampaignIcon from '@mui/icons-material/Flag';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import BookIcon from '@mui/icons-material/MenuBook';
import SigninModal from './SigninModal';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const user = { username: 'DM_Xavier', role: 'DM' };

  const navLinks = [
    { text: 'Campaigns', to: '/campaigns', icon: <CampaignIcon /> },
    { text: 'NPC Generator', to: '/npc-generator', icon: <PersonIcon /> },
    { text: 'Characters Gen', to: '/characters-gen', icon: <GroupIcon /> },
    { text: 'Sessions', to: '/sessions', icon: <BookIcon /> },
  ];

  const [isSigninOpen, setIsSigninOpen] = useState(false);

  return (
    <>
      <AppBar position="static" color="primary" sx={{ margin: 0, padding: 0, boxShadow: 'none' }}>
        <Toolbar>
          {/* Empty space to balance layout */}
          <Box sx={{ flex: 1 }} />


          {/* Logo / Title */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, textAlign: 'center', textDecoration: 'none', color: 'inherit' }}
          >
            D&D Assistant Tool
          </Typography>

          {/* Sign In / Sign Up button */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              component={RouterLink}
              to="/auth"
              color="inherit"
              onClick={() => setIsSigninOpen(true)}
            >
              Sign In / Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>  
          
    </>
  );
};

export default Navbar;
