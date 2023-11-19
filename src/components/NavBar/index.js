"use client";
import {useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
    Menu,
    MenuItem,
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
} from '@mui/material';
import { useRouter } from 'next/navigation';
//get next auth session
import { useSession } from 'next-auth/react';
import AvatarIcon from '@components/AvatarIcon';

export default function MenuAppBar() {
    const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

    const { data: session, status } = useSession();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    setAnchorEl(null);
  };

  const handleCloseLogut = () => {
    setAnchorEl(null);
    router.push("/auth/signout");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ProbaUAM
          </Typography>
          <div>
            <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',

                }} >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {session.names}
                </Typography>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AvatarIcon />
                </IconButton>
              </Box>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => {
                    handleClose();
                }}>Profile</MenuItem>
                <MenuItem onClick={handleCloseLogut}>Log out</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
