import NavBarHome from "@components/NavBarHome";
import { Grid, Box, Typography } from "@mui/material";
import QRCode from "react-qr-code";

const pages = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    role: 'admin'
  },
  {
    name: 'Admisiones',
    path: '/admissions',
    role: 'professional'
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
    name: 'Contacto',
    path: '/contact',
    role: 'any'
  },
]

export default async function Home() {

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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '90%',
            maxWidth: '500px',
            height: '90%',
            maxHeight: '580px',
            margin: '0',
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.75)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '2rem',
              marginBottom: '2rem',
            }}
          >
            <Typography
                  variant="h5"
                  sx={{
                    color: '#F4D73B',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >Bienvenido a&nbsp;</Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#0069A3',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
               ProbaUAM
            </Typography>
            </div>
          <Typography
              variant="h5"
              sx={{
                color: '#575757',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Escanea el codigo QR con tu celular
            </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '5rem',
              marginBottom: '4rem',
            }}
          >
            <QRCode value="https://docs.google.com/spreadsheets/d/1A8kKBvcyBxLllYRw_TEbASovhDXBZ4ofwSyyrCVF1MQ/edit?usp=sharing" 
              fgColor="#0069A3"
            />
          </Box>
        </Box>
      </Box>  
    </Grid>
  )
}
