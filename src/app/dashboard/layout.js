import { Grid } from '@mui/material';
import ProtectedRoute from '@middleware/ProtectedRoute';
import DrawerPro from '@components/DrawerPro';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';

const drawerOptions = [
    {
        0: {
            label: 'Dashboard',
            icon: <DashboardIcon />,
            path: '/dashboard',
        },
        1: {
            label: 'Users',
            icon: <PeopleIcon />,
            path: '/dashboard/users',
        },
    },
    {
        0: {
            label: 'Entities',
            icon: <BusinessIcon />,
            path: '/dashboard/entities',
        },
    },
];

export default async function Layout({ children }) {

    return (
        <ProtectedRoute role='admin'>
            <Grid
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    margin: '0',
                    padding: '0'
                }}
            >
                <DrawerPro options={drawerOptions} >{children}</DrawerPro>
            </Grid>
        </ProtectedRoute>
    );
}