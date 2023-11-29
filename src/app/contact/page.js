"use client";
import {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Stack,
    TextField,
    Typography,
    Avatar
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Link from "next/link";
import { handleEmailFire } from "@calls/mail";
import { 
    UploadFile,
} from '@mui/icons-material';
import { Link as MuiLink } from '@mui/material';

const PqrsTipo = [
    "Petición",
    "Queja",
    "Reclamo",
    "Sugerencia"
];

export default function Contact() {
    const [avatar, setAvatar] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [hover, setHover] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleContact = async (values, helpers) => {
        helpers.setSubmitting(true);
        setLoading(true);
        try {
            const info = await handleEmailFire(
                values.correo,
                'PQRS | ProbaUAM',
                `
                <div>
                    <h1>PQRS | ProbaUAM</h1>
                    <h3>Nombre completo: ${values.nombreCompleto}</h3>
                    <h3>Identificación: ${values.identificacion}</h3>
                    <h3>Correo electrónico: ${values.correo}</h3>
                    <h3>Número de celular: ${values.numeroCelular}</h3>
                    <h3>Tipo de solicitud: ${values.tipoSolicitud}</h3>
                    <h3>Descripción: </h3>
                    <p>${values.descripcion}</p>
                </div>
                `
            );
            if (info) {
                setSuccess(true);
                setLoading(false);
                helpers.setStatus({ success: true });
                helpers.setSubmitting(false);
            }
        } catch (error) {
            console.error(error);
            helpers.setErrors({ submit: error.message });
            helpers.setSubmitting(false);
            helpers.setStatus({ success: false });
            setLoading(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            nombreCompleto: '',
            identificacion: '',
            correo: '',
            numeroCelular: '',
            tipoSolicitud: '',
            descripcion: '',
            submit: null
        },
        validationSchema: Yup.object({
            nombreCompleto: Yup
                .string()
                .max(255)
                .required('First name is required'),
            identificacion: Yup
                .string()
                .max(255)
                .required('Identification number is required'),
            correo: Yup
                .string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
            numeroCelular: Yup
                .string()
                .max(255)
                .required('Cellphone number is required'),
            tipoSolicitud: Yup
                .string()
                .max(255)
                .required('Request type is required'),
            descripcion: Yup
                .string()
                .max(4096)
                .required('Description is required'),
        }),
        onSubmit: async (values, helpers) => {
            await handleContact(values, helpers);
        }
    });

    if (!success) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '80%',
                    maxHeight: '80%',
                    backgroundColor: 'background.paper',
                    borderRadius: '10px',
                    padding: '20px',
                    maxWidth: '700px',
                    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
                    overflow: 'auto',
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
                        PQRS
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
                            error={!!(formik.touched.nombreCompleto && formik.errors.nombreCompleto)}
                            fullWidth
                            helperText={formik.touched.nombreCompleto && formik.errors.nombreCompleto}
                            label="Nombre completo"
                            name="nombreCompleto"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.nombreCompleto}
                        />
                        <TextField
                            error={!!(formik.touched.identificacion && formik.errors.identificacion)}
                            fullWidth
                            helperText={formik.touched.identificacion && formik.errors.identificacion}
                            label="Identificación"
                            name="identificacion"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.identificacion}
                        />
                        <TextField
                            error={!!(formik.touched.correo && formik.errors.correo)}
                            fullWidth
                            helperText={formik.touched.correo && formik.errors.correo}
                            label="Correo electrónico"
                            name="correo"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="email"
                            value={formik.values.correo}
                        />
                        <TextField
                            error={!!(formik.touched.numeroCelular && formik.errors.numeroCelular)}
                            fullWidth
                            helperText={formik.touched.numeroCelular && formik.errors.numeroCelular}
                            label="Número de celular"
                            name="numeroCelular"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.numeroCelular}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tipo de solicitud</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formik.values.tipoSolicitud}
                                label="Tipo de solicitud"
                                name="tipoSolicitud"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            >
                                {
                                    PqrsTipo.map((tipo, index) => (
                                        <MenuItem key={index} value={tipo}>{tipo}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <TextField
                            error={!!(formik.touched.descripcion && formik.errors.descripcion)}
                            fullWidth
                            helperText={formik.touched.descripcion && formik.errors.descripcion}
                            label="Descripción"
                            name="descripcion"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.descripcion}
                            multiline
                            maxRows={8}
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
                        Enviar
                    </Button>
                </form>
                <Typography
                    color="text.secondary"
                    variant="body1"
                    sx={{
                        mt: 3,
                        textAlign: 'center',
                        cursor: 'pointer',
                    }}
                    fontWeight={700}
                >
                    <MuiLink
                        color="inherit"
                        underline="always"
                        target="_blank"
                        rel="noopener"
                        href="https://www.autonoma.edu.co/sites/default/files/2022-08/Politica-tratamiento-de-datos-personales.pdf"
                    >
                        Política de tratamiento de datos personales
                    </MuiLink>
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '80%',
                maxHeight: '80%',
                backgroundColor: 'background.paper',
                borderRadius: '10px',
                padding: '20px',
                maxWidth: '700px',
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
                overflow: 'auto',
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
                    PQRS
                </Typography>
            </Stack>
            <Stack
                spacing={3}
                sx={{
                    width: '100%'
                }}
            >
                <Typography
                    color="text.primary"
                    variant="subtitle1"
                    fontWeight={700}
                >
                    Su PQRS ha sido enviada con éxito
                </Typography>
            </Stack>
        </Box>
    );
}