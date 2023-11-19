"use client";
import { useState } from 'react'
import { forgotPassword } from "@calls/auth";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Stack,
    TextField,
    Typography
} from '@mui/material';

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);

    async function handleReset (values, { setSubmitting, setErrors, setStatus, resetForm  }) {
        setSubmitting(true);
        try {
            const res = await forgotPassword(values.email);
            setEmail(values.email);
            if (res !== null) {
                if (res.status === "ok") { 
                    console.debug("Email sent: ", res);
                    setSubmitting(false);
                    setStatus({ success: true });
                    setSuccess(true);
                    resetForm();
                } else {
                    console.debug("Error sending email: ", res);
                    if (res.errors) {
                        console.debug("Errors: ", res.errors);
                        setSubmitting(false);
                        setStatus({ success: false });
                        setErrors({ submit: res.errors[0].msg });
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
            email: '',
            submit: null
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
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
                                An email has been sent to {email} with further instructions.
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="subtitle2"
                            >
                                Please check your inbox.
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
                                    Enter your email address and we will send you a link to reset your password.
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
                                        error={!!(formik.touched.email && formik.errors.email)}
                                        fullWidth
                                        helperText={formik.touched.email && formik.errors.email}
                                        label="Email Address"
                                        name="email"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="email"
                                        value={formik.values.email}
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
                                    Continue
                                </Button>
                            </form>
                        </Stack>
                    )
                }
            </Box>
    );
}