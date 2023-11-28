"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { 
    getUserEntitiesProfessional,
    getEntityProfessionalAdmissions
} from "@calls/user";

import {
    Box,
    Stack,
    Typography,
} from '@mui/material';

import ListItemText from '@mui/material/ListItemText';

import AdmissionCard from "@components/AdmissionCard";

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const boxStyles = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'background.paper',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: '10px',
    padding: '2rem',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
};

export default function Admissions() {
    const [entities, setEntities] = useState(null);
    const [admissions, setAdmissions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    const session = useSelector((state) => state.authReducer.session);

    const [selectedEnt, setSelectedEnt] = useState("");
    const [loadingAdmissions, setLoadingAdmissions] = useState(true);
    const [successAdmissions, setSuccessAdmissions] = useState(false);

  const handleChangeSelectedEnt = (event) => {
    setSelectedEnt(event.target.value);
    console.log("Selected ent: ", event.target.value);
  };

    useEffect(() => {
        async function fetchEntities() {
            try {
                if (session !== null) {
                    console.log("Session is not null: ", session);
                    const res = await getUserEntitiesProfessional(session.id, session.token);
                    if (res !== null) {
                        if (res.status === "ok") {
                            console.log("Entities fetched: ", res);
                            setEntities(res.data);
                            setSuccess(true);
                        } else {
                            console.log("Error fetching user: ", res);
                            setSuccess(false);
                        }
                    } else {
                        console.log("Res is null fetchEntities: ", res);
                        setSuccess(false);
                    }
                    setLoading(false);
                } else {
                    console.log("Session is null: ", session);
                    setLoading(false);
                    setSuccess(false);
                }
            } catch (error) {
                console.log("Error fetching entites: ", error);
                setLoading(false);
                setSuccess(false);
            }
        }
        fetchEntities();
    }, [session]);

    useEffect(() => {
        async function fetchAdmissions() {
            try {
                if (session !== null && selectedEnt !== "") {
                    console.log("Session is not null: ", session);
                    const res = await getEntityProfessionalAdmissions(selectedEnt, session.id, session.token);
                    if (res !== null) {
                        if (res.status === "ok") {
                            console.log("admissions fetched: ", res);
                            setAdmissions(res.data);
                            setSuccessAdmissions(true);
                        } else {
                            console.log("Error fetching admissions: ", res);
                            setSuccessAdmissions(false);
                        }
                    } else {
                        console.log("Res is null fetchAdmissions: ", res);
                        setSuccessAdmissions(false);
                    }
                    setLoadingAdmissions(false);
                } else {
                    console.log("Session is null: ", session);
                    setLoadingAdmissions(false);
                    setSuccessAdmissions(false);
                }
            } catch (error) {
                console.log("Error fetching admissions: ", error);
                setLoadingAdmissions(false);
                setSuccessAdmissions(false);
            }
        }
        fetchAdmissions();
    }, [selectedEnt, session]);
                    

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
                <FormControl sx={{ m: 1, width: 'inherit' }}>
                    <InputLabel id="demo-simple-select-label">Entidades</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedEnt}
                    onChange={handleChangeSelectedEnt}
                    input={<OutlinedInput label="Entidades" />}
                    MenuProps={MenuProps}
                    >
                    {entities.map((ent) => (
                        <MenuItem key={ent.id} value={ent.id}>
                            <ListItemText primary={ent.ent_nombre} />
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                <Stack
                    sx={{
                        alignItems: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100%',
                        marginTop: '1rem'
                    }}
                    spacing={3}
                >
                    <Typography 
                        variant="h4" 
                        component="div"
                        fontWeight={700}
                    >
                        Admisiones
                    </Typography>
                    {
                        loadingAdmissions ? (
                            <Typography
                                color="text.primary"
                                variant="h2"
                                fontWeight={400}
                            >
                                Loading...
                            </Typography>
                        ) : successAdmissions ? (
                            
                            <Stack
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    height: '100%',
                                    overflow: 'auto',
                                    alignContent: 'flex-start',
                                    alignItems: 'baseline',
                                }}
                                spacing={3}
                            >
                                {
                                    admissions.map((adm) => (
                                        <AdmissionCard
                                            key={adm.id}
                                            admission={adm}
                                        />
                                    ))
                                }
                                {
                                    admissions.length === 0 &&
                                    <Typography
                                        color="text.primary"
                                        variant="h6"
                                        fontWeight={700}
                                    >
                                        No hay admisiones activas.
                                    </Typography>
                                }
                            </Stack>
                        ) : (
                            <Typography
                                color="text.primary"
                                variant="h5"
                                fontWeight={400}
                            >
                                Selecciona una entidad primero
                            </Typography>
                        )
                    }
                    
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
                    We couldnt fetch any admissions.
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