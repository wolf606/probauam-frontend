"use client";
import {useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from '@components/NavBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { useRouter } from 'next/navigation';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const drawerWidth = 240;

export default function DrawerPro({children, options, avatar, letter}) {

  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function createDrawerOptions(drawerOption) {
    return (
      <List>
        {Object.keys(drawerOption).map((key) => {
          const { label, icon, path } = drawerOption[key];
          return (
            <ListItem key={key} onClick={() => router.push(path)}>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    )
  }

  return (
    <Box
        sx={{
            display: 'flex',
            width: '100%',
            height: '100%',
        }}
    >
        <CssBaseline />
        <NavBar open={open} setOpen={setOpen}/>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={() => setOpen(!open)}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {options.map((option, index) => {
            return (
              <div key={index}>
                {createDrawerOptions(option)}
                <Divider />
              </div>
            );
          })}
        </Drawer>
        <Main 
        open={open}
        sx={{
          marginTop: '64px',
        }}
        >
          {children}
        </Main>
    </Box>
  );
}
