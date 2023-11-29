"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUser } from "@calls/user";

import {
    Box,
    Stack,
    Typography,
} from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Chip from '@mui/material/Chip';

//import icons for administrator, professional and guest role
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonIcon from '@mui/icons-material/Person';

//Active icon
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
//Inactive icon
import CancelIcon from '@mui/icons-material/Cancel';

import AvatarPicture from "@components/AvatarPicture";
import { Yesteryear } from "next/font/google";

const boxStyles = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    backgroundColor: 'background.paper',
    justifyContent: 'flex-start',
    borderRadius: '10px',
    padding: '4rem',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
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

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [userInfoOpen, setUserInfoOpen] = useState(true);

    const session = useSelector((state) => state.authReducer.session);
    console.log("Session: ", session);

    useEffect(() => {
        async function fetchUser() {
            try {
                if (session !== null) {
                    const res = await getUser(session.id, session.token);
                    if (res !== null) {
                        if (res.status === "ok") {
                            console.log("User fetched: ", res);
                            setUser(res.data);
                            setSuccess(true);
                        } else {
                            console.log("Error fetching user: ", res);
                            setSuccess(false);
                        }
                    } else {
                        console.log("Res is null fetchUser: ", res);
                        setSuccess(false);
                    }
                    setLoading(false);
                } else {
                    console.log("Session is null: ", session);
                    setLoading(false);
                    setSuccess(false);
                }
            } catch (error) {
                console.log("Error fetching user: ", error);
                setLoading(false);
                setSuccess(false);
            }
        }
        fetchUser();
    }, [session]);

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
                        alignItems: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '400px',
                    }}
                    spacing={3}
                >
                    <AvatarPicture
                    session={session}/>
                    <Typography
                        color="text.primary"
                        variant="h5"
                        fontWeight={700}
                    >
                        {user.profile.pro_nombre} {user.profile.pro_apelli}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="subtitle2"
                    >
                        {user.email}
                    </Typography>
                    <List
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            width: '100%',
                            maxWidth: 250,
                            alignItems: 'center',
                            bgcolor: 'background.paper',
                        }}
                    >
                        {
                            user.role.includes("admin") ? (
                                <Chip
                                    icon={<SupervisorAccountIcon />}
                                    label="Administrador"
                                    color="primary"
                                    variant="outlined"
                                    sx={
                                        chipStyles
                                    }
                                />
                            ) : user.role.includes("professional") ? (
                                <Chip
                                    icon={<AccountBoxIcon />}
                                    label="Profesional"
                                    color="primary"
                                    variant="outlined"
                                    sx={
                                        chipStyles
                                    }
                                />
                            ) : (
                                <Chip
                                    icon={<PersonIcon />}
                                    label="Usuario"
                                    color="primary"
                                    variant="outlined"
                                    sx={
                                        chipStyles
                                    }
                                />
                            )
                        }
                        {
                            user.active ? (
                                <Chip
                                    icon={<CheckCircleIcon />}
                                    label="Activo"
                                    color="success"
                                    variant="outlined"
                                    sx={
                                        chipStyles
                                    }
                                />
                            ) : (
                                <Chip
                                    icon={<CancelIcon />}
                                    label="Inactivo"
                                    color="error"
                                    variant="outlined"
                                    sx={
                                        chipStyles
                                    }
                                />
                            )
                        }
                    </List>
                </Stack>
                <Stack
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100%',
                        marginLeft: '4rem',
                        overflow: 'auto',
                    }}
                    spacing={3}
                >
                    <Typography
                        color="text.primary"
                        variant="h3"
                        fontWeight={700}
                    >
                        Mi perfil
                    </Typography>
                    <Accordion
                        expanded={userInfoOpen}
                        onChange={() => setUserInfoOpen(!userInfoOpen)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={accordionStyles}
                        >
                            <Typography
                                color="text.primary"
                                variant="h5"
                                fontWeight={700}
                            >
                                Informacion del usuario
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List
                                sx={accordioListStyles}
                            >
                                <ListItem>
                                    <ListItemText primary="Email" secondary={user.email} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="Active" secondary={user.active ? "Yes" : "No"} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    {
                                        user.role.includes("admin") ? (
                                            <ListItemText primary="Role" secondary="Administrador" />
                                        ) : user.role.includes("professional") ? (
                                            <ListItemText primary="Role" secondary="Profesional" />
                                        ) : (
                                            <ListItemText primary="Role" secondary="Usuario" />
                                        )
                                    }
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="Created" secondary={new Date(user.createdAt).toLocaleString('en-US', { timeZone: 'UTC' })} />
                                </ListItem>
                            </List> 
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={accordionStyles}
                        >
                            <Typography
                                color="text.primary"
                                variant="h5"
                                fontWeight={700}
                            >
                                Perfil
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {
                                user.profile !== null && user.profile !== undefined ? (
                                    <List
                                sx={accordioListStyles}
                            >
                                <ListItem>
                                    <ListItemText primary="Name" secondary={user.profile.pro_nombre} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="Surname" secondary={user.profile.pro_apelli} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="Identification type" secondary={user.profile.pro_tipide} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="Identification number" secondary={user.profile.pro_numide} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    {
                                        user.profile.pro_fecnac ? (
                                            <ListItemText primary="Birthday" secondary={new Date(user.profile.pro_fecnac).toLocaleDateString('en-US', { timeZone: 'UTC' })} />
                                        ) : (
                                            <ListItemText primary="Birthday" secondary="Not set" />
                                        )
                                    }
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="Phone number" secondary={"+"+user.profile.pro_celpai+" "+user.profile.pro_celula} />
                                </ListItem>
                                <Divider />
                            </List>
                                ) : (
                                    <Typography
                                        color="text.secondary"
                                        variant="subtitle1"
                                        fontWeight={500}
                                    >
                                        Sin datos
                                    </Typography>
                                )
                            }
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={accordionStyles}
                        >
                            <Typography
                                color="text.primary"
                                variant="h5"
                                fontWeight={700}
                            >
                                Address
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {
                                user.profile.pro_addres !== null && user.profile.pro_addres !== undefined ? (
                                    <List
                                sx={accordioListStyles}
                            >
                                <ListItem>
                                    <ListItemText primary="Address" secondary={user.profile.pro_addres.add_addres} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="City" secondary={user.profile.pro_addres.add_city} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="Postal code" secondary={user.profile.pro_addres.add_poscod} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="Country" secondary={user.profile.pro_addres.add_countr} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="State" secondary={user.profile.pro_addres.add_state} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="Phone number" secondary={"+" + user.profile.pro_addres.add_telcou + " " + user.profile.pro_addres.add_teleph} />
                                </ListItem>
                            </List>
                                ) : (
                                    <Typography
                                        color="text.secondary"
                                        variant="subtitle1"
                                        fontWeight={500}
                                    >
                                        Sin datos
                                    </Typography>
                                )
                            }
                        </AccordionDetails>
                    </Accordion>
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
                    We couldnt fetch your profile.
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