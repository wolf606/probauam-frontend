"use client";
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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const router = useRouter();

    const handleSignIn = async (values, helpers) => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
            });
            if (result.error === null) {
                helpers.setStatus({ success: true });
                helpers.setSubmitting(false);
                helpers.resetForm();
                router.push("/");
            } else {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: "Contraseña invalida." });
                helpers.setSubmitting(false);
            }
        } catch (err) {
            helpers.setStatus({ success: false });
            console.debug("err: ", err);
            helpers.setErrors({ submit: err.message });
            helpers.setSubmitting(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            submit: null
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
            password: Yup
                .string()
                .max(255)
                .min(7)
                .matches(/^(?=.*[a-zA-Z])(?=.*\d)/, 'Password must contain at least one letter and one number')
                .required('Password is required')
        }),
        onSubmit: async (values, helpers) => {
            await handleSignIn(values, helpers);
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
                    Login
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    Don&apos;t have an account?
                    &nbsp;
                    <Link
                        href="/"
                    >
                        Register
                    </Link>
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
        </Box>
    );
}