"use client";
import React, {useState, useEffect} from 'react';
import {
  sendReqGetPic
} from "@utils/http";
import {
  showActivity,
  getBestScore,
  getAllScoresFromActivityAdmission
} from "@calls/user";
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
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

const accordioListStyles = {
  width: '100%',
  bgcolor: 'background.paper',
}

const boxStyles={ minWidth: 275, maxWidth: '14rem', paddingRight: '1rem' };

export default function ActivityCard({activityId, admissionId}) {

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  
  const session = useSelector((state) => state.authReducer.session);
  const [activity, setActivity] = useState(null);
  const [firstImage, setFirstImage] = useState(null);

  const [bestScore, setBestScore] = useState(null);

  const [open, setOpen] = useState(false);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const getActivity = async () => {
      await showActivity(activityId, session.token)
      .then((res) => {
        if (res.status === "ok") {
          setActivity(res.data);
          setLoading(false);
          setSuccess(true);
        } else {
          console.log("FUCK", res);
          setLoading(false);
          setSuccess(false);
        }
      })
      .catch((err) => {
        console.log("FUCK ME ERROR", err);
        setLoading(false);
        setSuccess(false);
      })
    }
    getActivity();
  }, [session, activityId]);

  useEffect(() => {
    const getFirstImage = async () => {
      const url = activity.act_galler[0];
      await sendReqGetPic(url, session.token)
      .then((res) => {
        setFirstImage(URL.createObjectURL(res));
      })
    }
    if (activity !== null) {
      getFirstImage();
    }
  }, [session, activity]);

  useEffect(() => {
    const getBestScoreAvailable = async () => {
      console.log("activityId: ", activityId);
      console.log("admissionId: ", admissionId);
      await getBestScore(activityId, admissionId, session.token)
      .then((res) => {
        console.log("score res: ", res);
        if (res.status === "ok") {
          if (res.data !== null) {
            setBestScore(res.data);
          }
        } else {
          console.log("FUCK ME loading best score", res);
        }
      })
      .catch((err) => {
        console.log("FUCK ME ERROR loading best score", err);
      })
    }
    getBestScoreAvailable();
  }, [session, admissionId, activityId]);

  useEffect(() => {
    const getAllScores = async () => {
      console.log("activityId: ", activityId);
      console.log("admissionId: ", admissionId);
      await getAllScoresFromActivityAdmission(activityId, admissionId, session.token)
      .then((res) => {
        console.log("ALL scores res: ", res);
        if (res.status === "ok") {
          setScores(res.data);
        } else {
          console.log("FUCK ME loading ALL scores", res);
        }
      })
      .catch((err) => {
        console.log("FUCK ME ERROR loading ALL scores", err);
      })
    }
    getAllScores();
  }, [open]);

  /*

  singleScore = {
    "id": "65644819cf9e16d5874d412a",
    "admiss_id": "655699fd40415c34eced85bb",
    "activi_id": "65641ce9fa0014a61222c216",
    "sco_start": "2023-11-27T02:39:37.067Z",
    "sco_end": "2023-11-27T02:41:12.714Z",
    "sco_score": 0,
    "sco_win": false,
    "sco_resume": {
        "sco_lifes": 0,
        "sco_flies": 0
    },
    "updatedAt": "2023-11-27T07:41:13.056Z",
    "createdAt": "2023-11-27T07:41:13.056Z"
}

  */


  if (loading) {
    return (
      <Box sx={boxStyles}>
        <Card variant="outlined">
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Actividad
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h5" component="div" fontWeight={500}>
                ?
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary" fontWeight={500}>
                ?
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    )
  }

  if (success) {
    return (
      <Box sx={boxStyles}>
      <Card variant="outlined">
        {
          firstImage !== null ? (
            <CardMedia
              component="img"
              height="140"
              image={firstImage}
              alt="Paella dish"
            />
          ) : (
            <CardMedia
              component="img"
              height="140"
              image="https://images.unsplash.com/photo-1695765189584-046b776809cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwMTEzNjA3MA&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Paella dish"
            />
          )
        }
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Actividad {activity.act_activi}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" fontWeight={500}>
            {activity.act_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {activity.act_descri.length > 64 ? activity.act_descri.substring(0, 64) + "..." : activity.act_descri}
          </Typography>
          <Divder sx={{ my: 1 }} />
          {/* best score */}
          {
            bestScore !== null ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Maximo Puntaje
                </Typography>
                <Typography variant="h5" component="div" fontWeight={500}>
                  {bestScore.sco_score}
                </Typography>
                {/* win or loose, dont forget to also say it with text, use Chip*/}
                {
                  bestScore.sco_win ? (
                    <Chip
                      icon={<CheckCircleIcon />}
                      label="Ganaste"
                      color="success"
                      variant="outlined"
                    />
                  ) : (
                    <Chip
                      icon={<CancelIcon />}
                      label="Perdiste"
                      color="error"
                      variant="outlined"
                    />
                  )
                }
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h5" component="div" fontWeight={500}>
                  ?
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" fontWeight={500}>
                  ?
                </Typography>
              </Box>
            )
          }
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => setOpen(true)}>Ver mas</Button>
        </CardActions>
      </Card>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', overflow: 'auto', maxHeight: '90%', width: '50%', minWidth: '600px', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <Typography variant="h4" component="h2" fontWeight={500} sx={{ mb: 2 }}>
            Puntajes por fecha
          </Typography>
            {
              scores.map((score, index) => {
                return (
                <Accordion
                  key={index}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                  >
                    <Typography
                        color="text.primary"
                        variant="h7"
                        fontWeight={500}
                    >
                        {new Date(score.sco_start).toLocaleString('en-US', { timeZone: 'UTC' })}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List
                        sx={accordioListStyles}
                    >
                        <ListItem>
                            <ListItemText primary="Puntaje" secondary={score.sco_score} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Vidas" secondary={score.sco_resume.sco_lifes} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Moscas" secondary={score.sco_resume.sco_flies} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Logro" secondary={
                              score.sco_win ? (
                                <Chip
                                  icon={<CheckCircleIcon />}
                                  label="Ganaste"
                                  color="success"
                                  variant="outlined"
                                  sx={{
                                    marginTop: '0.5rem'
                                  }}
                                />
                              ) : (
                                <Chip
                                  icon={<CancelIcon />}
                                  label="Perdiste"
                                  color="error"
                                  variant="outlined"
                                  sx={{
                                    marginTop: '0.5rem'
                                  }}
                                />
                              )
                            } />
                        </ListItem>
                    </List>
                  </AccordionDetails>
                </Accordion>
                )
              })
            }
            {
              scores === null || scores.length === 0 ? (
                <Typography
                    color="text.primary"
                    variant="h7"
                    fontWeight={500}
                >
                    No hay puntajes para esta actividad
                </Typography>
              ) : null
            }
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
              <Button onClick={() => setOpen(false)}>Cerrar</Button>
            </Box>
        </Box>
      </Modal>
    </Box>
    )
  }

  return (
    <Box sx={boxStyles}>
        <Card variant="outlined">
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Actividad
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h5" component="div" fontWeight={500}>
                Error al cargar la actividad
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
  )
}
