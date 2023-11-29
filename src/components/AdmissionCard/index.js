"use client";
import {useState, useEffect} from 'react';
import {
  sendReqGetPic
} from "@utils/http";
import { getActiveUsers, getStates, getMunicipalities } from "@calls/user";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Stack,
  TextField,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Divder from '@mui/material/Divider';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { Modal } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Chip from '@mui/material/Chip';


// const Genero = {
//   male: "Masculino",
//   female: "Femenino"
// };

// const EstadoCivil = {
//   single: "Soltero",
//   married: "Casado",
//   widowed: "Viudo",
//   divorced: "Divorciado",
//   civilUnion: "Unión civil"
// };

// const NivelEducacion = {
//   primComp: "Primaria completa",
//   primInc: "Primaria incompleta",
//   secComp: "Secundaria completa",
//   secInc: "Secundaria incompleta",
//   tecnologo: "Tecnólogo",
//   tecnico: "Técnico",
//   pregrado: "Pregrado",
//   posgrado: "Posgrado",
//   ninguno: "Ninguno"
// };

// const RegimenSeguridadSocial = {
//   contributivo: "Contributivo",
//   subsidiado: "Subsidiado",
//   especial: "Especial",
//   vinculado: "Vinculado",
//   otro: "Otro",
//   ninguno: "Ninguno"
// };

// const EstratoSocioeconomico = {
//   uno: "1",
//   dos: "2",
//   tres: "3",
//   cuatro: "4",
//   cinco: "5",
//   seis: "6"
// };

// const Parentesco = {
//   conyuge: "Conyuge",
//   padre: "Padre",
//   madre: "Madre",
//   hijo: "Hijo",
//   hermano: "Hermano",
//   tio: "Tio",
//   sobrino: "Sobrino",
//   primo: "Primo",
//   nieto: "Nieto",
//   cuñado: "Cuñado",
//   suegro: "Suegro",
//   yerno: "Yerno",
//   nuera: "Nuera",
//   abuelo: "Abuelo",
//   nieto: "Nieto",
//   otro: "Otro"
// };

// const TipoIdentificacion = [
//   "Documento Nacional de Identidad",
//   "Pasaporte",
//   "Tarjeta de Residencia",
//   "Licencia de Conducir",
//   "Seguridad Social"
// ]

export default function AdmissionCard({admission}) {

  const router = useRouter();

  const [avatar, setAvatar] = useState(null);
  // const [openModal, setOpenModal] = useState(false);
  // const [mode, setMode] = useState(null);
  const session = useSelector((state) => state.authReducer.session);

  // const [users, setUsers] = useState([]);
  // const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const getAvatar = async () => {
      const url = admission.patient.profile.pro_avatar;
      await sendReqGetPic(url, session.token)
      .then((res) => {
        setAvatar(URL.createObjectURL(res));
      })
    }
    getAvatar();
  }, [session, admission]);

  // useEffect(() => {
  //   const getUsers = async () => {
  //     await getActiveUsers(session.token)
  //     .then((res) => {
  //       if (res.status === "ok") {
  //         setUsers(res.data.map((user) => {
  //           return {
  //             id: user.id,
  //             email: user.email,
  //             ...user.profile
  //           }
  //         }));
  //       }
  //     })
  //   }
  //   getUsers();
  // }, [session, openModal]);

  return (
    <Box sx={{ minWidth: 275, paddingRight: '1rem' }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Usuario
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {
              avatar !== null ? (
                <Avatar
                  alt="Avatar"
                  src={avatar}
                  sx={{ width: 100, height: 100 }}
                />
              ) : (
                <Avatar
                  sx={{ width: 100, height: 100 }}
                >
                  <Typography variant="h4" fontWeight={500}>
                    {admission.patient.profile.pro_nombre[0]}
                  </Typography>
                </Avatar>
              )
            }
              <Typography variant="h5" component="div" fontWeight={500}>
                {admission.patient.profile.pro_nombre} {admission.patient.profile.pro_apelli}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary" fontWeight={500}>
                {admission.patient.profile.pro_tipide === "Documento Nacional de Identidad" ? "C.C." : admission.patient.profile.pro_tipide} {admission.patient.profile.pro_numide}
              </Typography>
            </Box>
          <Typography variant="body2">
            <span style={{ fontWeight: 'bold' }}>Sexo:</span> {admission.adm_sde.sde_sexo}
          </Typography>
          <Typography variant="body2">
            <span style={{ fontWeight: 'bold' }}>EPS:</span> {admission.adm_sde.sde_eps}
          </Typography>
          <Typography variant="body2">
            <span style={{ fontWeight: 'bold' }}>Estatura:</span> {admission.adm_can.can_estatu} m
          </Typography>
          <Typography variant="body2">
            <span style={{ fontWeight: 'bold' }}>Peso:</span> {admission.adm_can.can_peso} kg
          </Typography>
          <Typography variant="body2">
            <span style={{ fontWeight: 'bold' }}>Fecha de admisión:</span> {admission.adm_admdat !== null ? 
              new Date(admission.adm_admdat).toLocaleDateString('en-US', { timeZone: 'UTC' })
              : "No disponible"}
          </Typography>
          {
            admission.adm_disdat !== null ? (
              <Typography variant="body2">
                <span style={{ fontWeight: 'bold' }}>Fecha de salida:</span> {admission.adm_disdat !== null ?
                  new Date(admission.adm_disdat).toLocaleDateString('en-US', { timeZone: 'UTC' })
                  : "No disponible"}
              </Typography>
            ) : (
              <div></div>
            )
          }
        </CardContent>
        <CardActions>
          <Button 
            size="small"
            onClick={() => router.push(`/admissions/${admission.id}`)}
          >Ver mas</Button>
          {/* <Button size="small" onClick={() => {
            setOpenModal(true);
            setMode("add");
          } }>Editar</Button> */}
        </CardActions>
      </Card>
      {/* <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 1200,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          overflow: 'scroll',
          maxHeight: '80%'
        }}>
          <Typography variant="h4" component="div" fontWeight={500}>
            {mode === "add" ? "Agregar admision" : "Editar admision"}
          </Typography>
          {
          mode === "edit" ? (
            <Stack
              sx={{ width: '100%', overflow: 'hidden' }}
              direction="column"
              spacing={2}
            >
              <Typography variant="h6" component="div" fontWeight={500}>
                Lista de Usuarios
              </Typography>
              <DataGrid
                rows={users}
                columns={[
                  { field: 'pro_avatar', headerName: 'Foto', width: 130, renderCell: (params) => (
                    <Avatar
                      alt="Avatar"
                      src={params.value}
                      sx={{ width: 50, height: 50 }}
                    />
                  ) },
                  { field: 'pro_nombre', headerName: 'Nombre', width: 130 },
                  { field: 'pro_apelli', headerName: 'Apellido', width: 130 },
                  { field: 'pro_numide', headerName: 'Número de documento', width: 130 },
                  { field: 'pro_celula', headerName: 'Celular', width: 130 },
                ]}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClic
                selectionModel={selectedUser !== null ? [selectedUser] : []}
                onSelectionModelChange={(params) => {
                  setSelectedUser(params.selectionModel[params.selectionModel.length - 1]);
                  console.log(params.selectionModel[params.selectionModel.length - 1]);
                }}
              />
            </Stack>
          ) : (
            <Stack
              sx={{ width: '100%', overflow: 'hidden' }}
              direction="column"
              spacing={2}
            >
                <Typography variant="h6" component="div" fontWeight={500}>
              Datos de la admisión
            </Typography>
              <Stack
                sx={{ width: '100%' }}
                direction="column"
                spacing={2}
              >
              
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ backgroundColor: '#f5f5f5' }}
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }} fontWeight={500}>
                      Admision datos
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Fecha de admisión"
                        ></DatePicker>
                    </LocalizationProvider>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ backgroundColor: '#f5f5f5' }}
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }} fontWeight={500}>
                      Compañero de admisión
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack
                      sx={{ width: '100%' }}
                      direction="column"
                      spacing={2}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Nombre"
                        variant="outlined"
                      />
                      <TextField
                        id="outlined-basic"
                        label="Apellido"
                        variant="outlined"
                      />
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">Tipo de identificación</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={TipoIdentificacion[0]}
                          label="Tipo de identificación"
                        >
                          {
                            TipoIdentificacion.map((tipo) => {
                              return (
                                <MenuItem value={tipo} key={tipo} >{tipo}</MenuItem>
                              )
                            })
                          }
                        </Select>
                      </FormControl>
                      <TextField
                        id="outlined-basic"
                        label="Número de documento"
                        variant="outlined"
                      />
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">Parentesco</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={Array.from(Object.keys(Parentesco))[0]}
                          label="Parentesco"
                        >
                          {
                            Object.keys(Parentesco).map((key) => {
                              return (
                                <MenuItem value={key} key={key} >{Parentesco[key]}</MenuItem>
                              )
                            })
                          }
                        </Select>
                      </FormControl>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ backgroundColor: '#f5f5f5' }}
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }} fontWeight={500}>
                      Datos socio-demográficos y económicos
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack
                      sx={{ width: '100%' }}
                      direction="column"
                      spacing={2}
                    >
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">Sexo</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={Array.from(Object.keys(Genero))[0]}
                          label="Sexo"
                        >
                          {
                            Object.keys(Genero).map((key) => {
                              return (
                                <MenuItem value={key} key={key} >{Genero[key]}</MenuItem>
                              )
                            })
                          }
                        </Select>
                      </FormControl>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">Estado civil</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={Array.from(Object.keys(EstadoCivil))[0]}
                          label="Estado civil"
                        >
                          {
                            Object.keys(EstadoCivil).map((key) => {
                              return (
                                <MenuItem value={key} key={key} >{EstadoCivil[key]}</MenuItem>
                              )
                            })
                          }
                        </Select>
                      </FormControl>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">Nivel de educación</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={Array.from(Object.keys(NivelEducacion))[0]}
                          label="Nivel de educación"
                        >
                          {
                            Object.keys(NivelEducacion).map((key) => {
                              return (
                                <MenuItem value={key} key={key} >{NivelEducacion[key]}</MenuItem>
                              )
                            })
                          }
                        </Select>
                      </FormControl>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">Regimen de seguridad social</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={Array.from(Object.keys(RegimenSeguridadSocial))[0]}
                          label="Regimen de seguridad social"
                        >
                          {
                            Object.keys(RegimenSeguridadSocial).map((key) => {
                              return (
                                <MenuItem value={key} key={key} >{RegimenSeguridadSocial[key]}</MenuItem>
                              )
                            })
                          }
                        </Select>
                      </FormControl>
                      <TextField
                        id="outlined-basic"
                        label="EPS"
                        variant="outlined"
                      />
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">Estrato socioeconómico</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={Array.from(Object.keys(EstratoSocioeconomico))[0]}
                          label="Estrato socioeconómico"
                        >
                          {
                            Object.keys(EstratoSocioeconomico).map((key) => {
                              return (
                                <MenuItem value={key} key={key} >{EstratoSocioeconomico[key]}</MenuItem>
                              )
                            })
                          }
                        </Select>
                      </FormControl>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ backgroundColor: '#f5f5f5' }}
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }} fontWeight={500}>
                      Datos antropométricos
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack
                      sx={{ width: '100%' }}
                      direction="column"
                      spacing={2}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Estatura (m)"
                        variant="outlined"
                      />
                      <TextField
                        id="outlined-basic"
                        label="Peso (kg)"
                        variant="outlined"
                      />
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </Stack>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Guardar
              </Button>
            </Stack>
          )
        }
        </Box>
      </Modal> */}
    </Box>
  )
}
