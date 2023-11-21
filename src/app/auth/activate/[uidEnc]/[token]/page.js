"use client";
import { useState, useEffect } from 'react'
import { activateAccount } from "@calls/auth";
import { verifyToken } from "@utils/jwt";
import {
    Box,
    Button,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import Link from "next/link";

export default function Activate({ params }) {
    const [uidEnc, setUidEnc] = useState(params.uidEnc);
    const [token, setToken] = useState(params.token);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    const decodedToken = verifyToken(token);
    if (decodedToken === null) {
        throw new Error("Invalid token.");
    }

    useEffect(() => {
        async function activate() {
            const res = await activateAccount(uidEnc, token);
            console.log("Res: ", await res);
            if (res !== null && res !== undefined) {
                if (res.status === "ok") {
                    console.log("Account activated: ", res);
                    setSuccess(true);
                } else {
                    console.log("Error activating: ", res);
                    setLoading(false);
                }
            } else {
                console.log("Res is null activate: ", res);
                setLoading(false);
            }
            setLoading(false);
        }
        activate();
    }, []);
    
    if (loading) {
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
                        Activando cuenta...
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="subtitle2"
                    >
                        Por favor espere.
                    </Typography>
                </Stack>
            </Box>
        );
    }

    if (success) {
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
                        Activacion exitosa!
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="subtitle2"
                    >
                        Su cuenta ha sido activada exitosamente.
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="subtitle1"
                        fontWeight={700}
                    >
                        <Link href="/auth/signin">
                        Iniciar sesion
                        </Link>
                    </Typography>
                </Stack>
            </Box>
    );
    } else {
        throw new Error("Cannot activate account.");
    }

}