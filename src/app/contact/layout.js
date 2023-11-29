import NextLink from 'next/link';
import { Box, Grid } from '@mui/material';
import NavBarHome from '@components/NavBarHome';

const pages = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    role: 'admin'
  },
  {
    name: 'Iniciar Sesion',
    path: '/auth/signin',
    role: 'none'
  },
  {
    name: 'Registrarse',
    path: '/auth/signup',
    role: 'none'
  },
  {
    name: 'PQRS',
    path: '/contact',
    role: 'any'
  },
]

export default function Layout({ children }) {
    return (
        <Grid
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            margin: '0',
            padding: '0',
            backgroundImage: 'url(/images/background.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            overflow: 'hidden',
        }}
    > 
      <NavBarHome pages={pages}/>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          marginTop: '64px',
          padding: '0',
        }}
      >
        {children}
      </Box>  
    </Grid>
    );
}