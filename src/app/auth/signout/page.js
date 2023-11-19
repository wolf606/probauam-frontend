"use client";
import {
    Box,
    Button,
    Stack,
    Typography
} from '@mui/material';
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOut() {
    const router = useRouter();

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
                    Sign Out
                </Typography>
            </Stack>
            <Stack
                spacing={3}
                sx={{
                    width: '100%'
                }}
            >
                <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={async () => {
                        const data = await signOut({ redirect: false });
                        router.push("/");
                    }}
                >
                    Sign Out
                </Button>
            </Stack>
        </Box>
    );
}