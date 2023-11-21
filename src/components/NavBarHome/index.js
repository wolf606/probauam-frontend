"use client";
import {useState} from 'react';
import {
    Menu,
    MenuItem,
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AvatarIcon from '@components/AvatarIcon';
import { useSelector } from 'react-redux';

export default function NavBarHome({pages}) {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const session = useSelector((state) => state.authReducer.session);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseNavMenuOption = (path) => {
    setAnchorElNav(null);
    router.push(path);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

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
    <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Image
            src="/images/logos/navbar-3.png"
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
            fontWeight={700}
            sx={{
              marginLeft: '10px',
              color: '#0069A3',
            }}
          >
            ProbaUAM
          </Typography>
          {
            pages !== null && pages !== undefined && (
              <Box sx={{ 
                flexGrow: 1, 
                display: { xs: 'flex', md: 'none' },
                justifyContent: 'flex-end'
                 }}>
              <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon
                    sx={{
                      color: '#0069A3',
                    }}
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    marginTop: '8px',
                  }}
                >
                  {pages.map(
                    (page) => {
                      if (session === null || session === undefined) {
                        if (page.role === 'any' || page.role === 'none') {
                          return (
                            <MenuItem
                              key={page.name}
                              onClick={() => handleCloseNavMenuOption(page.path)}
                            >
                              {page.name}
                            </MenuItem>
                          )
                        }
                      } else {
                        if (page.role === 'any' || session.role.includes(page.role)) {
                          return (
                            <MenuItem
                              key={page.name}
                              onClick={() => handleCloseNavMenuOption(page.path)}
                            >
                              {page.name}
                            </MenuItem>
                          )
                        }
                      }
                    }
                  )}
                </Menu>
              </Box>
            )
          }
          
          {
            pages !== null && pages !== undefined && (
              <Box sx={{ 
                flexGrow: 1, 
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'flex-end'
                }}>
                {pages.map(
                  (page) => {
                    if (session === null || session === undefined) {
                      if (page.role === 'any' || page.role === 'none') {
                        return (
                          <Button
                            key={page.name}
                            onClick={() => router.push(page.path)}
                            sx={{ 
                              my: 2, 
                              color: 'white', 
                              display: 'block',
                              marginTop: '10px',
                              marginBottom: '10px',
                              color: '#0069A3',
                            }}
                          >
                            {page.name}
                          </Button>
                        )
                      }
                    } else {
                      if (page.role === 'any' || session.role.includes(page.role)) {
                        return (
                          <Button
                            key={page.name}
                            onClick={() => router.push(page.path)}
                            sx={{ 
                              my: 2, 
                              color: 'white', 
                              display: 'block',
                              marginTop: '10px',
                              marginBottom: '10px',
                              color: '#0069A3',
                            }}
                          >
                            {page.name}
                          </Button>
                        )
                      }
                    }
                  }
                )}
              </Box>
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
              <MenuItem 
                onClick={() => {
                    handleClose();
                    router.push("/profile");
                }}
              >Profile</MenuItem>
              <MenuItem onClick={handleCloseLogut}>Log out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
  )
}
