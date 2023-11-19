'use client';
import {
    Box,
    Stack,
    Typography,
    Skeleton
} from '@mui/material';

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '30%',
                backgroundColor: 'background.paper',
                justifyContent: 'center',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
            }}
        >
            <Stack
                spacing={1}
                sx={{
                    mb: 3
                }}
            >
                <Typography
                    color="text.primary"
                    variant="h4"
                >
                    Reset Password
                </Typography>
            </Stack>
            
            <Stack
                spacing={3}
                sx={{
                    width: '100%'
                }}
            >
                <Skeleton variant="rectangular" height={40} />
                <Skeleton variant="rectangular" height={40} />
            </Stack>
        </Box>
    );
}