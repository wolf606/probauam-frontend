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
                width: '80%',
                backgroundColor: 'background.paper',
                justifyContent: 'center',
                borderRadius: '10px',
                padding: '20px',
                maxWidth: '500px',
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
                    color="text.primary"
                    variant="h2"
                    fontWeight={700}
                >
                    Lo siento, 
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="subtitle"
                    fontWeight={500}
                >
                    No podemos activar su cuenta en este momento.
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="subtitle1"
                    fontWeight={500}
                >
                    Please try again.
                </Typography>
            </Stack>
        </Box>
    )
}