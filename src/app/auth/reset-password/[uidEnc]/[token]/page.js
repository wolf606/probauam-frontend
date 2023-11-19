"use client";
import { useState } from 'react'
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

    const decodedToken = verifyToken(token);
    if (decodedToken === null) {
        throw new Error("Invalid token.");
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
                            >
                                Success!
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="subtitle2"
                            >
                                Your password has been reset.
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="subtitle2"
                            >
                                <Link href="/auth/signin">
                                Sign in
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
                                >
                                    Reset Password
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    variant="subtitle2"
                                >
                                    {email}
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
                                    sx={{ mt: 3, backgroundColor: '#3b5998', color: 'white' }}
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