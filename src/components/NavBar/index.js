"use client";
import {useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import {
    Menu,
    MenuItem,
    AppBar as MuiAppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AvatarIcon from '@components/AvatarIcon';
import { useSelector } from 'react-redux';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function MenuAppBar({open, setOpen}) {
  const router = useRouter();
  const session = useSelector((state) => state.authReducer.session);
  const [anchorEl, setAnchorEl] = useState(null);

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
    <AppBar position="fixed" open={open}
      sx={{
        flexGrow: 1,
        height: '64px',
        backgroundColor: '#0069A3'
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpen(!open)}
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Image
            src="/images/logos/navbar-2.png"
            alt="ProbaUAM"
            width={90}
            height={56}
            priority
            style={{
              cursor: 'pointer',
              margin: '4px'
            }}
            onClick={() => router.push("/")}
          />
        <Typography variant="h6"
            component="div"
            fontWeight={500}
            sx={{
              marginLeft: '10px',
              flexGrow: 1,
            }}
        >
            ProbaUAM
        </Typography>
          {
            session !== null && session !== undefined && (
            <Typography 
                component="div"
                fontWeight={400}
            >
                {session.names}
            </Typography>
            )
          }
          {
            session !== null && session !== undefined && (
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{
                marginLeft: '10px',
                marginRight: '0',
              }}
            >
              <AvatarIcon />
            </IconButton>
            )
          }
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
              sx={{
                '& .MuiPaper-root': {
                  top: '64px !important',
                }
              }}
            >
              <MenuItem onClick={() => {
                  handleClose();
                  router.push("/profile");
              }}
              >Profile</MenuItem>
              <MenuItem onClick={handleCloseLogut}>Log out</MenuItem>
          </Menu>
      </Toolbar>
    </AppBar>
  );
}
