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
import { useRouter } from "next/navigation";
import { login } from "@calls/auth";
import { verifyToken } from '@utils/jwt';
import { setSession } from "@store/features/auths-slice";
import { useDispatch } from "react-redux";

export default function SignIn() {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSignIn = async (values, helpers) => {
        helpers.setSubmitting(true);
        try {
            const result = await login(values.email, values.password);
            console.log("result: ", result);
            if (result.hasOwnProperty("status")) {
                if (result.status === "ok") {
                    const token = result.accessToken;
                    const decodedToken = verifyToken(token);
                    if (decodedToken !== null) {
                        localStorage.setItem("token", token);
                        dispatch(setSession(
                            {
                                ...decodedToken,
                                token: token,
                            }
                        ));
                        helpers.setStatus({ success: true });
                        helpers.setSubmitting(false);
                        helpers.resetForm();
                        router.push("/");
                    } else {
                        helpers.setStatus({ success: false });
                        helpers.setErrors({ submit: "Token invalido." });
                        helpers.setSubmitting(false);
                    }
                } else if (result.status === "error") {
                    if (result.hasOwnProperty("message")) {
                        helpers.setStatus({ success: false });
                        console.debug("err: ", result);
                        helpers.setErrors({ submit: "Error del servidor." });
                        helpers.setSubmitting(false);
                    } else if (result.hasOwnProperty("errors")) {
                        if (result.errors.hasOwnProperty("password")) {
                            helpers.setStatus({ success: false });
                            helpers.setErrors({ password: "Contraseña invalida." });
                            helpers.setSubmitting(false);
                        } else {
                            helpers.setStatus({ success: false });
                            helpers.setErrors({ submit: "Error desconocido validaciones." });
                            helpers.setSubmitting(false);
                        }
                    }
                } else {
                    console.debug("err: ", result);
                    helpers.setStatus({ success: false });
                    helpers.setErrors({ submit: "Error desconocido." });
                    helpers.setSubmitting(false);
                }
            } else if (result.hasOwnProperty("errors")) {
                    if (result.errors[0].path === "email") {
                        helpers.setStatus({ success: false });
                        helpers.setErrors({ email: "El correo no se encuentra registrado." });
                        helpers.setSubmitting(false);
                    } else {
                        helpers.setStatus({ success: false });
                        helpers.setErrors({ submit: "Error desconocido validaciones." });
                        helpers.setSubmitting(false);
                    }
            } else {
                console.debug("err: ", result);
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: "Error desconocido." });
                helpers.setSubmitting(false);
            }
        } catch (err) {
            helpers.setStatus({ success: false });
            console.log("err: ", err);
            helpers.setErrors({ submit: "Error al contactar el servidor." });
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
                    Iniciar Sesión
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    No tiene una cuenta?
                    &nbsp;
                    <Link
                        href="/"
                    >
                        Crear usuario
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
                <Typography
                    color="text.secondary"
                    variant="subtitle1"
                    fontWeight={700}
                    sx={{
                        mt: 3,
                        cursor: 'pointer',
                        textAlign: 'left'
                    
                    }}
                >
                    <Link href="/auth/reset-password">
                    Olvide mi contraseña
                    </Link>
                </Typography>
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
                    Continue
                </Button>
            </form>
        </Box>
    );
}