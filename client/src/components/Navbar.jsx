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

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Logo / Title */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
          >
            D&D Assistant Tool
          </Typography>

          {/* Desktop Menu */}
          {!isMobile ? (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.text}
                  component={RouterLink}
                  to={link.to}
                  color="inherit"
                  startIcon={link.icon}
                >
                  {link.text}
                </Button>
              ))}
              {user && (
                <Typography variant="body2" sx={{ ml: 2 }}>
                  👤 {user.username}
                </Typography>
              )}
            </Box>
          ) : (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.text} disablePadding>
                <ListItemButton component={RouterLink} to={link.to}>
                  {link.icon}
                  <ListItemText primary={link.text} sx={{ ml: 2 }} />
                </ListItemButton>
              </ListItem>
            ))}
            {user && (
              <ListItem>
                <ListItemText primary={`👤 ${user.username}`} />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
