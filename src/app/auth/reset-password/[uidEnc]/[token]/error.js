'use client';
import {
    Box,
    Stack,
    Typography
} from '@mui/material';

import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    //The token is invalid or has expired.
    //this is the error handling page
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
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                spacing={3}
            >
                <Typography
                    color="textPrimary"
                    variant="h1"
                >
                    Sorry, 
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="subtitle2"
                >
                    The token is invalid or has expired.
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="subtitle2"
                >
                    Please try again.
                </Typography>
            </Stack>
        </Box>
    )
}