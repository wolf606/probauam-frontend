"use client";
import { useEffect } from "react";
import { verifyToken } from "@utils/jwt";
import { setSession } from "./features/auths-slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Fira_Sans } from 'next/font/google'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const fira = Fira_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: 'inherit',
    button: {
      textTransform: 'none',
      fontSize: '1rem',
    },
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          color: '#0069A3',
          fontWeight: 500,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '1rem',
          fontWeight: 500,
        },
        secondary: {
          fontSize: '1rem',
          fontWeight: 500,
        },
      },
    },
  },
});

export function GetSession({ children }) {
  const dispatch = useDispatch();
  const currentSession = useSelector((state) => state.authReducer.session);
  useEffect(() => {
    const fetchSession = async () => {
      try {
        if (currentSession === null) {
          const token = localStorage.getItem("token");
          const decodedToken = await verifyToken(token); // Assuming verifyToken is asynchronous
          if (decodedToken !== null) {
            dispatch(
              setSession({
                ...decodedToken,
                token: token,
              })
            );
          }
        }
      } catch (err) {
        console.error("Error fetching or updating session:", err);
      }
    };

    fetchSession();
  }, [dispatch, currentSession]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
      
    </>
  );
}