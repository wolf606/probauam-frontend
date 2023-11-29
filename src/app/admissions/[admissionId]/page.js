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