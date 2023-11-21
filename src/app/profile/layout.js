import { Grid } from '@mui/material';
import ProtectedRoute from '@middleware/ProtectedRoute';
import DrawerPro from '@components/DrawerPro';

import HomeMaxOutlined from '@mui/icons-material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const drawerOptions = [
    {
        0: {
            label: 'Home',
            icon: <HomeMaxOutlined />,
            path: '/',
        },
    },
    {
        0: {
            label: 'Help',
            icon: <HelpOutlineIcon />,
            path: '/contact',
        },
    },
];

export default async function Layout({ children }) {

    return (
        <ProtectedRoute role='any'>
            <Grid
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    margin: '0',
                    padding: '2rem'
                }}
            >
                <DrawerPro options={drawerOptions} >{children}</DrawerPro>
            </Grid>
        </ProtectedRoute>
    );
}