import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';



export const NavBar:React.FC = ()=> {
const backToLogin = () => { window.location.href = "/"; }
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={backToLogin} sx={{ p: 0 }}>
                Back to Login
              </IconButton>
            </Tooltip>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
