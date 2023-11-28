"use client";
import {useState, useEffect} from 'react';
import {
  sendReqGetPic
} from "@utils/http";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';

export default function AdmissionCard({admission}) {

  const router = useRouter();

  const [avatar, setAvatar] = useState(null);
  const session = useSelector((state) => state.authReducer.session);

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

  return (
    <Box sx={{ minWidth: 275, paddingRight: '1rem' }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Paciente
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
        </CardActions>
      </Card>
    </Box>
  )
}
