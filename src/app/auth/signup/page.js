"use client";
import {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
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
import { useRouter } from "next/navigation";
import { createUser } from "@calls/user";
import { 
    UploadFile,
} from '@mui/icons-material';
import { getApiUrl } from "@config";
import { Link as MuiLink } from '@mui/material';

const TipoIdentificacion = [
    "Documento Nacional de Identidad",
    "Pasaporte",
    "Tarjeta de Residencia",
    "Licencia de Conducir",
    "Seguridad Social"
]

const CodigoPais = [
    "60",
    "58",
    "593",
    "51"
];

export const sendReqFormData = async (apiUrl, verb, userId, body) => {
    const url = `${apiUrl}/api/v1/users/${userId}/profile`;
    console.log(url);
    const newFormData = objectToFormData(body);

    const options = {
        method: verb,
        mode: "cors",
        headers: {
            "Accept": "application/json",
        },
        body: newFormData,
        cache: "no-cache",
    };

    const response = await fetch(url, options);
    return await response.json();
}

function objectToFormData(obj) {
    const formData = new FormData();

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            formData.append(key, obj[key]);
        }
    }

    return formData;
}

export default function SignUp() {
    const [avatar, setAvatar] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [hover, setHover] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleMouseEnter = () => {
        setHover(true);
      };
    
      const handleMouseLeave = () => {
        setHover(false);
      };

      const handleUploadClick = ()  => {
        document.getElementById('fileInput').click();
    }
    const handleUpload = (e) => {
        const file = e.target?.files?.[0];
        setAvatarFile(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setAvatar(reader.result);
            setHover(false);
        }
    };

    const router = useRouter();

    const AvatarIcon = () => {
        return (
            <Avatar
                sx={{ width: 100, height: 100, cursor: 'pointer' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleUploadClick}
            >
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleUpload}
                />
                {hover ? (
                    <div style={
                        {
                            position: 'relative',
                        }
                    }>
                    <UploadFile
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                    {
                        avatar != null && (
                            <Image
                                src={avatar}
                                alt="Picture of the author"
                                width={150}
                                height={150}
                                style={
                                    {
                                        opacity: '0.2',
                                        objectFit: 'cover'
                                    }
                                }
                            />
                        )
                    }
                    </div>
                ) : (
                    <div>
                        {
                        avatar != null ? (
                            <Image
                                src={avatar}
                                alt="Picture of the author"
                                width={150}
                                height={150}
                                style={
                                    {
                                        objectFit: 'cover'
                                    }
                                }
                            />
                        ) : (
                            <Avatar
                                sx={{ width: 100, height: 100 }}
                            />
                        )
                    }
                    </div>
                )}
            </Avatar>
)
    }

    const handleSignUp = async (values, helpers) => {
        helpers.setSubmitting(true);
        try {
            const userData = {
                email: values.email,
                password: values.password
            };
            const profileData = {
                pro_nombre: values.pro_nombre,
                pro_apelli: values.pro_apelli,
                pro_tipide: values.pro_tipide,
                pro_numide: values.pro_numide,
                pro_celpai: values.pro_celpai,
                pro_celula: values.pro_celula,
                avatar: avatarFile
            };
            const user = await createUser(userData);
            if (user) {
                if (user.hasOwnProperty('status')) {
                    if (user.status === "ok") {
                        const apiUrl = await getApiUrl();
                        const profile = await sendReqFormData(apiUrl,"POST", user.data.id, profileData);
                        if (profile) {
                            if (profile.hasOwnProperty('status')) {
                                if (profile.status === "ok") {
                                    setSuccess(true);
                                } else {
                                    helpers.setErrors({ submit: profile.message });
                                    helpers.setStatus({ success: false });
                                    helpers.setSubmitting(false);
                                }
                            } else {
                                helpers.setErrors({ submit: 'Error al crear el usuario' });
                                helpers.setStatus({ success: false });
                                helpers.setSubmitting(false);
                            }
                        } else {
                            helpers.setErrors({ submit: 'Error al crear el usuario' });
                            helpers.setStatus({ success: false });
                            helpers.setSubmitting(false);
                        }
                    } else {
                        helpers.setErrors({ submit: user.message });
                        helpers.setStatus({ success: false });
                        helpers.setSubmitting(false);
                    }
                } else {
                    helpers.setErrors({ submit: 'Error al crear el usuario' });
                    helpers.setStatus({ success: false });
                    helpers.setSubmitting(false);
                }
            } else {
                helpers.setErrors({ submit: 'Error al crear el usuario' });
                helpers.setStatus({ success: false });
                helpers.setSubmitting(false);
            }
        } catch (error) {
            console.log(error);
            helpers.setErrors({ submit: error.message });
            helpers.setStatus({ success: false });
            helpers.setSubmitting(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            pro_nombre: '',
            pro_apelli: '',
            pro_tipide: TipoIdentificacion[0],
            pro_numide: '',
            pro_celpai: CodigoPais[0],
            pro_celula: '',
            email: '',
            password: '',
            submit: null
        },
        validationSchema: Yup.object({
            pro_nombre: Yup
                .string()
                .max(255)
                .required('First name is required'),
            pro_apelli: Yup
                .string()
                .max(255)
                .required('Last name is required'),
            pro_tipide: Yup
                .string()
                .max(255)
                .required('Identification type is required'),
            pro_numide: Yup
                .string()
                .max(255)
                .required('Identification number is required'),
            pro_celpai: Yup
                .string()
                .max(255)
                .required('Cellphone country code is required'),
            pro_celula: Yup
                .string()
                .max(255)
                .required('Cellphone number is required'),
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
                .required('Password is required'),
        }),
        onSubmit: async (values, helpers) => {
            await handleSignUp(values, helpers);
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
                        Registrarse
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        Ya tiene una cuenta?
                        &nbsp;
                        <Link
                            href="/auth/signin"
                        >
                            Iniciar sesión
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
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: 'center',
                                width: '100%'
                            }}
                            spacing={3}
                        >
                            <AvatarIcon />
                            <Typography
                                color="text.primary"
                                variant="h5"
                                fontWeight={700}
                            >
                                Seleccione una foto de perfil

                            </Typography>
                        </Stack>
                        <TextField
                            error={!!(formik.touched.pro_nombre && formik.errors.pro_nombre)}
                            fullWidth
                            helperText={formik.touched.pro_nombre && formik.errors.pro_nombre}
                            label="Nombre"
                            name="pro_nombre"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.pro_nombre}
                        />
                        <TextField
                            error={!!(formik.touched.pro_apelli && formik.errors.pro_apelli)}
                            fullWidth
                            helperText={formik.touched.pro_apelli && formik.errors.pro_apelli}
                            label="Apellido"
                            name="pro_apelli"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.pro_apelli}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tipo de identificación</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formik.values.pro_tipide}
                                label="Tipo de identificación"
                                name="pro_tipide"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            >
                                {
                                    TipoIdentificacion.map((tipo, index) => (
                                        <MenuItem key={index} value={tipo}>{tipo}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <TextField
                            error={!!(formik.touched.pro_numide && formik.errors.pro_numide)}
                            fullWidth
                            helperText={formik.touched.pro_numide && formik.errors.pro_numide}
                            label="Número de identificación"
                            name="pro_numide"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.pro_numide}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Código de país</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formik.values.pro_celpai}
                                label="Código de país"
                                name="pro_celpai"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            >
                                {
                                    CodigoPais.map((codigo, index) => (
                                        <MenuItem key={index} value={codigo}>{codigo}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <TextField
                            error={!!(formik.touched.pro_celula && formik.errors.pro_celula)}
                            fullWidth
                            helperText={formik.touched.pro_celula && formik.errors.pro_celula}
                            label="Número de celular"
                            name="pro_celula"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.pro_celula}
                        />
                        <TextField
                            error={!!(formik.touched.email && formik.errors.email)}
                            fullWidth
                            helperText={formik.touched.email && formik.errors.email}
                            label="Correo electrónico"
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
                            label="Contraseña"
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
                        sx={{ mt: 3, backgroundColor: '#0069A3',
                        '&:hover': {
                            backgroundColor: '#0069A3',
                            opacity: 0.8,
                        }, }}
                        type="submit"
                        variant="contained"
                        
                    >
                        Registrarse
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
                    Registrarse
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    Ya tiene una cuenta?
                    &nbsp;
                    <Link
                        href="/auth/signin"
                    >
                        Iniciar sesión
                    </Link>
                </Typography>
            </Stack>
            <Typography
                color="text.primary"
                variant="h4"
                fontWeight={700}
            >
                Usuario creado exitosamente
            </Typography>
            <Typography
                color="text.secondary"
                variant="body2"
            >
                Por favor verifique su correo electrónico para activar su cuenta
            </Typography>
        </Box>
    );
}