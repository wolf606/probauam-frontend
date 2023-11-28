"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { 
    showAdmission,
} from "@calls/user";

import {
    Stack,
    Typography,
} from '@mui/material';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import InfoIcon from '@mui/icons-material/Info';
import ScoreIcon from '@mui/icons-material/Score';

import AvatarPicture from "@components/AvatarPicture";

import Chip from '@mui/material/Chip';
import List from '@mui/material/List';

import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonIcon from '@mui/icons-material/Person';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

//Active icon
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
//Inactive icon
import CancelIcon from '@mui/icons-material/Cancel';

import ActivitiesSelector from "@components/ActivitiesSelector";

const boxStyles = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    backgroundColor: 'background.paper',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: '10px',
    padding: '2rem',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
    justifyContent: 'flex-start',
};

const chipStyles = {
    mb: 3,
    width: 'fit-content',
    padding: '0.5rem',
    marginRight: '0.5rem',
};

const accordionStyles = {
    backgroundColor: 'background.paper',
    width: '100%',
}      

const accordioListStyles = {
    width: '100%',
    bgcolor: 'background.paper',
}

/*

{
    "id": "655699fd40415c34eced85bb",
    "patient": {
        "id": "655c4386e2b8fdc29d91546c",
        "email": "fuzzyjellyrock@gmail.com",
        "active": true,
        "role": [
            "user"
        ],
        "profile": {
            "pro_nombre": "Andres",
            "pro_apelli": "Sandoval",
            "pro_tipide": "Documento Nacional de Identidad",
            "pro_numide": "47784344",
            "pro_celpai": "57",
            "pro_celula": "3183838321",
            "pro_avatar": "http://localhost:3900/api/v1/uploads/avatar/e477b6b753a0b96fe27abd7e0bdb27d3",
            "pro_addres": {
                "add_addres": "Fake Street",
                "add_city": "Manizales",
                "add_poscod": "23733",
                "add_countr": "Colombia",
                "add_state": "Caldas",
                "add_telcou": "80",
                "add_teleph": "8003451212"
            }
        },
        "createdAt": "2023-11-21T05:43:34.615Z",
        "updatedAt": "2023-11-27T01:04:41.344Z"
    },
    "entity": {
        "id": "6563dde9a5bff26418c2f896",
        "ent_nombre": "Entity 1234",
        "ent_direcc": {
            "add_addres": "Fake Street",
            "add_city": "Manizales",
            "add_poscod": "23733",
            "add_countr": "Colombia",
            "add_state": "Caldas",
            "add_telcou": "80",
            "add_teleph": "8003451212"
        },
        "ent_celpai": "57",
        "ent_celula": "3564837623",
        "ent_avatar": "http://localhost:3900/api/v1/uploads/avatar/79d677fd8f7381c428ae0617db02025a",
        "createdAt": "2023-11-27T00:08:09.323Z",
        "updatedAt": "2023-11-27T00:08:09.323Z"
    },
    "professional": {
        "id": "6554d32ecf28c01a2824cf08",
        "email": "luismsanchez808@gmail.com",
        "active": true,
        "role": [
            "professional"
        ],
        "profile": {
            "pro_nombre": "Mike L",
            "pro_apelli": "Sanchez",
            "pro_tipide": "Documento Nacional de Identidad",
            "pro_numide": "47784344",
            "pro_celpai": "57",
            "pro_celula": "3183838321",
            "pro_avatar": "http://localhost:3900/api/v1/uploads/avatar/a63dc9e9983249b4e270a84321fca92e",
            "pro_addres": {
                "add_addres": "Fake Street",
                "add_city": "Manizales",
                "add_poscod": "23733",
                "add_countr": "Colombia",
                "add_state": "Caldas",
                "add_telcou": "80",
                "add_teleph": "8003451212"
            }
        },
        "createdAt": "2023-11-15T14:18:22.472Z",
        "updatedAt": "2023-11-21T05:04:10.498Z"
    },
    "adm_patien": "655c4386e2b8fdc29d91546c",
    "adm_profes": "6554d32ecf28c01a2824cf08",
    "adm_entity": "6563dde9a5bff26418c2f896",
    "adm_admdat": "2022-01-01T00:00:00.000Z",
    "adm_disdat": null,
    "adm_compan": {
        "com_profil": {
            "pro_nombre": "John",
            "pro_apelli": "Doe",
            "pro_tipide": "Documento Nacional de Identidad",
            "pro_numide": "123456789",
            "pro_celpai": "57",
            "pro_celula": "3001234567",
            "pro_addres": {
                "add_addres": "123 Main St",
                "add_city": "Bogota",
                "add_poscod": "110111",
                "add_countr": "Colombia",
                "add_state": "Bogota",
                "add_telcou": "57",
                "add_teleph": "12345678"
            }
        },
        "com_parent": "Padre"
    },
    "adm_sde": {
        "sde_sexo": "Masculino",
        "sde_estciv": "Soltero",
        "sde_nivedu": "Pregrado",
        "sde_regseg": "Contributivo",
        "sde_eps": "Nueva EPS",
        "sde_estrat": "2"
    },
    "adm_can": {
        "can_estatu": 2,
        "can_peso": 90.7,
        "can_percin": 20.2,
        "can_peciri": false
    },
    "createdAt": "2023-11-16T22:38:53.791Z",
    "updatedAt": "2023-11-16T22:38:53.791Z"
}

*/


export default function PatientInfo({params}) {
    const { admissionId } = params;
    const [admission, setAdmission] = useState(null);
    const [admissionAvatar, setAdmissionAvatar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    
    const session = useSelector((state) => state.authReducer.session);

    const [value, setValue] = useState(0);

    const handleChangeTabs = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchAdmission = async () => {
            await showAdmission(admissionId, session.token)
            .then((response) => {
                console.log("show admission: ",response);
                if (response.status === "ok") {
                    setAdmission(response.data);
                    setAdmissionAvatar({
                        avatar: response.data.patient.profile.pro_avatar,
                        names: response.data.patient.profile.pro_nombre,
                    });
                    setLoading(false);
                    setSuccess(true);
                } else {
                    setLoading(false);
                    setSuccess(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                setSuccess(false);
            })
        }
        fetchAdmission();
    }, [session,  admissionId]);     

    if (loading) {
        return (
            <Box
                sx={boxStyles}
            >
                <Stack
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    spacing={3}
                >
                    <Typography
                        color="text.primary"
                        variant="h2"
                        fontWeight={700}
                    >
                        Loading...
                    </Typography>
                </Stack>
            </Box>
        );
    }

    if (success) {
        return (
            <Box
                sx={boxStyles}
            >
                <Stack
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        width: 'fit-content',
                        height: 'fit-content',
                        paddingLeft: '2rem',
                        paddingRight: '2rem',
                        outline: '1px solid #0069A3',
                        backgroundColor: '#0069A3',
                        borderRadius: '10px',
                        padding: '2rem',
                    }}
                    spacing={3}
                >
                    <AvatarPicture
                    session={admissionAvatar}/>
                    <Stack
                        sx={{
                            alignItems: 'left',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        spacing={3}
                    >
                        <Typography
                            color="white"
                            variant="h5"
                            fontWeight={700}
                        >
                            {admission.patient.profile.pro_nombre} {admission.patient.profile.pro_apelli}
                        </Typography>
                        <Typography
                            color="white"
                            variant="subtitle2"
                        >
                            {admission.patient.profile.pro_tipide === "Documento Nacional de Identidad" ? "C.C. "+admission.patient.profile.pro_numide :  admission.patient.profile.pro_tipide+" "+admission.patient.profile.pro_numide}
                        </Typography>
                        <Typography
                            color="white"
                            variant="subtitle2"
                        >
                            <span style={{fontWeight: 700}}>Entidad: </span>{admission.entity.ent_nombre}
                        </Typography>
                        <Typography
                            color="white"
                            variant="subtitle2"
                        >
                            <span style={{fontWeight: 700}}>Profesional: </span>{admission.professional.profile.pro_nombre} {admission.professional.profile.pro_apelli}
                        </Typography>
                        <Typography
                            color="white"
                            variant="subtitle2"
                        >
                            <span style={{fontWeight: 700}}>Fecha de Admision: </span>{new Date(admission.adm_admdat).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                        </Typography>
                        <Typography
                            color="white"
                            variant="subtitle2"
                        >
                            <span style={{fontWeight: 700}}>Fecha de Alta: </span>{admission.adm_disdat !== null ? new Date(admission.adm_disdat).toLocaleDateString('en-US', { timeZone: 'UTC' }) : "No se ha dado de alta"}
                        </Typography>

                    </Stack>
                </Stack>
                <Stack
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100%',
                        padding: '1rem',
                    }}
                    spacing={3}
                >
                    <Tabs
                        value={value}
                        onChange={handleChangeTabs}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab label="Informacion" icon={<InfoIcon />} iconPosition="start"/>
                        <Tab label="Progreso Terapia" icon={<ScoreIcon />} iconPosition="start"/>
                    </Tabs>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: 'inherit',
                            height: '100%',
                            overflow: 'auto',
                        }}
                    >
                        {
                            value === 0 &&
                            <Stack
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: 'inherit',
                                    paddingLeft: '2rem',
                                    paddingRight: '0',
                                    height: '100%',
                                    overflow: 'auto',
                                }}
                                spacing={3}
                            >
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        sx={accordionStyles}
                                    >
                                        <Typography
                                            color="text.primary"
                                            variant="h6"
                                            fontWeight={700}
                                        >
                                            Perfil
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List
                                            sx={accordioListStyles}
                                        >
                                            <ListItem>
                                                <ListItemText
                                                    primary="Nombre"
                                                    secondary={admission.patient.profile.pro_nombre}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Apellido"
                                                    secondary={admission.patient.profile.pro_apelli}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Numero Identificacion"
                                                    secondary={admission.patient.profile.pro_tipide === "Documento Nacional de Identidad" ? "C.C. "+admission.patient.profile.pro_numide :  admission.patient.profile.pro_tipide+" "+admission.patient.profile.pro_numide}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Celular"
                                                    secondary={"+"+admission.patient.profile.pro_celpai+" "+admission.patient.profile.pro_celula}
                                                />
                                            </ListItem>
                                            <Divider/>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                        sx={accordionStyles}
                                    >
                                        <Typography
                                            color="text.primary"
                                            variant="h6"
                                            fontWeight={700}
                                        >
                                            Direccion
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List
                                            sx={accordioListStyles}
                                        >
                                            <ListItem>
                                                <ListItemText
                                                    primary="Direccion"
                                                    secondary={admission.patient.profile.pro_addres.add_addres}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Ciudad"
                                                    secondary={admission.patient.profile.pro_addres.add_city}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Codigo Postal"
                                                    secondary={admission.patient.profile.pro_addres.add_poscod}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Pais"
                                                    secondary={admission.patient.profile.pro_addres.add_countr}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Estado"
                                                    secondary={admission.patient.profile.pro_addres.add_state}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Telefono"
                                                    secondary={"+"+admission.patient.profile.pro_addres.add_telcou+" "+admission.patient.profile.pro_addres.add_teleph}
                                                />
                                            </ListItem>
                                            <Divider/>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                        sx={accordionStyles}
                                    >
                                        <Typography
                                            color="text.primary"
                                            variant="h6"
                                            fontWeight={700}
                                        >
                                            Acompanante
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List
                                            sx={accordioListStyles}
                                        >
                                            <ListItem>
                                                <ListItemText
                                                    primary="Nombre"
                                                    secondary={admission.adm_compan.com_profil.pro_nombre}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Apellido"
                                                    secondary={admission.adm_compan.com_profil.pro_apelli}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Numero Identificacion"
                                                    secondary={admission.adm_compan.com_profil.pro_tipide === "Documento Nacional de Identidad" ? "C.C. "+admission.adm_compan.com_profil.pro_numide :  admission.adm_compan.com_profil.pro_tipide+" "+admission.adm_compan.com_profil.pro_numide}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Celular"
                                                    secondary={"+"+admission.adm_compan.com_profil.pro_celpai+" "+admission.adm_compan.com_profil.pro_celula}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Parentesco"
                                                    secondary={admission.adm_compan.com_parent}
                                                />
                                            </ListItem>
                                            <Divider/>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                        sx={accordionStyles}
                                    >
                                        <Typography
                                            color="text.primary"
                                            variant="h6"
                                            fontWeight={700}
                                        >
                                            Acompanante Direccion
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List
                                            sx={accordioListStyles}
                                        >
                                            <ListItem>
                                                <ListItemText
                                                    primary="Direccion"
                                                    secondary={admission.adm_compan.com_profil.pro_addres.add_addres}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Ciudad"
                                                    secondary={admission.adm_compan.com_profil.pro_addres.add_city}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Codigo Postal"
                                                    secondary={admission.adm_compan.com_profil.pro_addres.add_poscod}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Pais"
                                                    secondary={admission.adm_compan.com_profil.pro_addres.add_countr}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Estado"
                                                    secondary={admission.adm_compan.com_profil.pro_addres.add_state}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Telefono"
                                                    secondary={"+"+admission.adm_compan.com_profil.pro_addres.add_telcou+" "+admission.adm_compan.com_profil.pro_addres.add_teleph}
                                                />
                                            </ListItem>
                                            <Divider/>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                        sx={accordionStyles}
                                    >
                                        <Typography
                                            color="text.primary"
                                            variant="h6"
                                            fontWeight={700}
                                        >
                                            Entidad
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List
                                            sx={accordioListStyles}
                                        >
                                            <ListItem>
                                                <ListItemText
                                                    primary="Nombre"
                                                    secondary={admission.entity.ent_nombre}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Celular"
                                                    secondary={"+"+admission.entity.ent_celpai+" "+admission.entity.ent_celula}
                                                />
                                            </ListItem>
                                            <Divider/>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                        sx={accordionStyles}
                                    >
                                        <Typography
                                            color="text.primary"
                                            variant="h6"
                                            fontWeight={700}
                                        >
                                            Profesional
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List
                                            sx={accordioListStyles}
                                        >
                                            <ListItem>
                                                <ListItemText
                                                    primary="Nombre"
                                                    secondary={admission.professional.profile.pro_nombre}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Apellido"
                                                    secondary={admission.professional.profile.pro_apelli}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Numero Identificacion"
                                                    secondary={admission.professional.profile.pro_tipide === "Documento Nacional de Identidad" ? "C.C. "+admission.professional.profile.pro_numide :  admission.professional.profile.pro_tipide+" "+admission.professional.profile.pro_numide}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Celular"
                                                    secondary={"+"+admission.professional.profile.pro_celpai+" "+admission.professional.profile.pro_celula}
                                                />
                                            </ListItem>
                                            <Divider/>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                        sx={accordionStyles}
                                    >
                                        <Typography
                                            color="text.primary"
                                            variant="h6"
                                            fontWeight={700}
                                        >
                                            Datos Socio Demograficos
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List
                                            sx={accordioListStyles}
                                        >
                                            <ListItem>
                                                <ListItemText
                                                    primary="Sexo"
                                                    secondary={admission.adm_sde.sde_sexo}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Estado Civil"
                                                    secondary={admission.adm_sde.sde_estciv}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Nivel Educativo"
                                                    secondary={admission.adm_sde.sde_nivedu}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Regimen Seguridad Social"
                                                    secondary={admission.adm_sde.sde_regseg}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="EPS"
                                                    secondary={admission.adm_sde.sde_eps}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Estrato"
                                                    secondary={admission.adm_sde.sde_estrat}
                                                />
                                            </ListItem>
                                            <Divider/>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                        sx={accordionStyles}
                                    >
                                        <Typography
                                            color="text.primary"
                                            variant="h6"
                                            fontWeight={700}
                                        >
                                            Datos Antropometricos
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List
                                            sx={accordioListStyles}
                                        >
                                            <ListItem>
                                                <ListItemText
                                                    primary="Estatura"
                                                    secondary={admission.adm_can.can_estatu+" m"}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Peso"
                                                    secondary={admission.adm_can.can_peso+ " kg"}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Indice Masa Corporal"
                                                    secondary={admission.adm_can.can_percin}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Percir Inicial"
                                                    secondary={admission.adm_can.can_peciri ? <CheckCircleIcon color="success"/> : <CancelIcon color="error"/>}
                                                />
                                            </ListItem>
                                            <Divider/>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            </Stack>
                        }
                        {
                            value === 1 &&
                            <Stack
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    height: '100%',
                                    overflow: 'auto',
                                    paddingLeft: '6rem',
                                    paddingRight: '6rem',
                                }}
                                spacing={3}
                            >
                                <ActivitiesSelector
                                    admissionId={admissionId}
                                />
                            </Stack>
                        }
                    </Box>
                </Stack>
            </Box>
        );
    }

    return (
        <Box
            sx={boxStyles}
        >
            <Stack
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                spacing={3}
            >
                <Typography
                    color="text.primary"
                    variant="h2"
                    fontWeight={700}
                >
                    Error
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="subtitle"
                    fontWeight={500}
                >
                    We couldnt load this patient info.
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="subtitle1"
                    fontWeight={500}
                >
                    Please try again.
                </Typography>
            </Stack>
        </Box>
    );
}