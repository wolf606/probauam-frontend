"use client";
import { useState, useEffect } from 'react'
import { resetPassword } from "@calls/auth";
import { verifyToken } from "@utils/jwt";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import Link from "next/link";

export default function ResetPassword({ params }) {
    const [uidEnc, setUidEnc] = useState(params.uidEnc);
    const [token, setToken] = useState(params.token);
    const [success, setSuccess] = useState(false);
    const [expired, setExpired] = useState(false);
    const [loading, setLoading] = useState(true);

    const decodedToken = verifyToken(token);
    if (decodedToken === null) {
        throw new Error("Invalid token.");
    }

    useEffect(() => {
        async function resetPwdTestLink() {
            const res = await resetPassword(uidEnc, token, "1234567");
            if (res !== null) {
                if (res.status === "ok") {
                    console.log(" WTF Password reset succesful: ", res);
                    setExpired(true);
                } else if (res.hasOwnProperty("errors")) {
                    console.log("Valid link", res);
                    setExpired(false);
                } else {
                    console.log("Error reseting: ", res);
                    setExpired(true);
                }
            } else {
                console.log("Res is null resetpassword: ", res);
                setExpired(true);
            }
            setLoading(false);
        }
        resetPwdTestLink();
    }, []);

    if (expired) {
        throw new Error("The token is invalid or has expired.");
    }

    const {
        email
    } = decodedToken;

    async function handleReset (values, { setSubmitting, setErrors, setStatus, resetForm  }) {
        setSubmitting(true);
        try {
            const res = await resetPassword(uidEnc, token, values.password);
            if (res !== null) {
                if (res.status === "ok") { 
                    console.debug("Password reset succesful: ", res);
                    setSubmitting(false);
                    setStatus({ success: true });
                    setSuccess(true);
                    resetForm();
                } else {
                    console.debug("Error reseting: ", res);
                    if (res.errors) {
                        console.debug("Errors: ", res.errors);
                        setSubmitting(false);
                        setStatus({ success: false });
                        setErrors({ submit: res.errors.password[0] });
                    } else {
                        console.debug("No errors.");
                        setSubmitting(false);
                        setStatus({ success: false });
                        setErrors({ submit: res.message });
                    }
                }
            } else {
                console.debug("Res is null resetpassword: ", res);
                setSubmitting(false);
                setStatus({ success: false });
                setErrors({ submit: "Cannot contact server." });
            }
        } catch (error) {
            console.debug("Failed reset password fetch: ", error);
            setSubmitting(false);
            setStatus({ success: false });
            setErrors({ submit: "Cannot contact server." });
        }
    }

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
            submit: null
        },
        validationSchema: Yup.object({
            password: Yup
                .string()
                .max(255)
                .min(7)
                .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, 'Password must contain at least one letter and one number')
                .required('Password is required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
        }),
        onSubmit: async (values, helpers) => {
            await handleReset(values, helpers);
        }
    });

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
            {
                success ? (
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
                            Cambio exitoso!
                        </Typography>
                        <Typography
                            color="text.secondary"
                            variant="subtitle2"
                        >
                            Your password has been reset.
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
                ) : (
                    <Stack
                        spacing={1}
                        sx={{
                            mb: 3
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
                                Reset Password
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="subtitle2"
                            >
                                Escriba una nueva contraseña para {email}
                            </Typography>
                        </Stack>
                        <form
                            noValidate
                            onSubmit={formik.handleSubmit}
                        >
                            <Stack
                                spacing={3}
                                sx={{
                                    width: '100%'
                                }}
                            >
                                <TextField
                                    error={!!(formik.touched.password && formik.errors.password)}
                                    fullWidth
                                    helperText={formik.touched.password && formik.errors.password}
                                    label="Password"
                                    name="password"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="password"
                                    value={formik.values.password}
                                />
                                <TextField
                                    error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                                    fullWidth
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="password"
                                    value={formik.values.confirmPassword}
                                />
                            </Stack>
                            {formik.errors.submit && (
                                <Typography
                                    color="error"
                                    sx={{ mt: 3 }}
                                    variant="body2"
                                >
                                    {formik.errors.submit}
                                </Typography>
                            )}
                            <Button
                                fullWidth
                                size="large"
                                sx={{ mt: 3, backgroundColor: '#0069A3',
                                '&:hover': {
                                    backgroundColor: '#0069A3',
                                    opacity: 0.8,
                                }, }}
                                type="submit"
                                variant="contained"
                            >
                                Reset Password
                            </Button>
                        </form>
                    </Stack>
                )
            }
        </Box>
    );
}