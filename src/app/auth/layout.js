import NextLink from 'next/link';
import { Box, Grid } from '@mui/material';
import { Logo } from '@components/logo';

export default function Layout({ children }) {
    return (
        <Grid
            sx={{
                display: 'flex',
                flexDirection: 'column',
                //another color for background other than white
                backgroundColor: '#cde4ff',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                margin: '0',
                padding: '0'
            }}
        >
            <Box
                component="header"
                sx={{
                    width: '100%'
                }}
            >
                <Box
                    component={NextLink}
                    href="/"
                    sx={{
                        display: 'inline-flex',
                        height: 32,
                        width: 32
                    }}
                >
                    <Logo />
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    }}
            >
                {children}
            </Box>
        </Grid>
    );
}