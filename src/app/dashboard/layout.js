//Dashboard layout
import NavBar from '@components/NavBar';
import { Box, Grid } from '@mui/material';
import ProtectedRoute from '@middleware/ProtectedRoute';

export default function Layout({ children }) {
    return (
        <ProtectedRoute>
            <Grid
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
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
                    <NavBar />
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
        </ProtectedRoute>
    );
}