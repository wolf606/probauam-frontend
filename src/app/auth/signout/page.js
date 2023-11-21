"use client";
import {
    Box,
    Button,
    Stack,
    Typography
} from '@mui/material';
import { useRouter } from "next/navigation";
import { removeSession } from '@store/features/auths-slice';
import { useDispatch } from "react-redux";

export default function SignOut() {
    const router = useRouter();
    const dispatch = useDispatch();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '80%',
                backgroundColor: 'background.paper',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '10px',
                padding: '2rem',
                maxWidth: '500px',
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
                    fontWeight={700}
                >
                    Cerrar Sesión?
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
                        localStorage.removeItem("token");
                        dispatch(removeSession());
                        router.push("/");
                    }}
                    sx={{
                        mt: 3,
                        backgroundColor: '#0069A3',
                        '&:hover': {
                            backgroundColor: '#0069A3',
                            opacity: 0.8,
                        },
                    }}
                >
                    Continuar
                </Button>
            </Stack>
        </Box>
    );
}