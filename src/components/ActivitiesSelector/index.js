"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { 
    indexActivities
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

import ActivityCard from "@components/ActivityCard";

import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import Looks6Icon from '@mui/icons-material/Looks6';

import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';
import Looks3OutlinedIcon from '@mui/icons-material/Looks3Outlined';

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

const phasesTabs = [
    {
        label: 'Fase 1',
        icon: <LooksOneOutlinedIcon />,
    },
    {
        label: 'Fase 2',
        icon: <LooksTwoOutlinedIcon />,
    },
    {
        label: 'Fase 3',
        icon: <Looks3OutlinedIcon />,
    }
];

const daysTabs = [
    {
        label: 'Dia 1',
        icon: <LooksOneIcon />,
    },
    {
        label: 'Dia 2',
        icon: <LooksTwoIcon />,
    },
    {
        label: 'Dia 3',
        icon: <Looks3Icon />,
    },
    {
        label: 'Dia 4',
        icon: <Looks4Icon />,
    },
    {
        label: 'Dia 5',
        icon: <Looks5Icon />,
    },
    {
        label: 'Dia 6',
        icon: <Looks6Icon />,
    },
];

export default function ActivitiesSelector({admissionId}) {
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    
    const session = useSelector((state) => state.authReducer.session);

    const [phase, setPhase] = useState(0);
    const [day, setDay] = useState(0);

    const handleChangePhase = (event, newValue) => {
        setPhase(newValue);
        setDay(0);
    };

    const handleChangeDay = (event, newValue) => {
        setDay(newValue);
    }

    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            setActivities([]);
            setLoading(true);
            setSuccess(false);
            await indexActivities(phase+1, day+1, session.token)
                .then((response) => {
                  console.log("loading activities: ", response);
                    if (response.status === "ok") {
                        setActivities(response.data);
                        setLoading(false);
                        setSuccess(true);
                    } else {
                      setActivities([]);
                      setLoading(false);
                      setSuccess(false);
                    }
                })
                .catch((error) => {
                    setActivities([]);
                    setLoading(false);
                    setSuccess(false);
                });
        };
        fetchActivities();
    }, [session, phase, day]);

    const RenderTabs = ({children}) => {
        return (
          <Stack
              sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 'inherit',
                  height: '100%',
                  overflow: 'auto',
                  alignItems: 'center',
              }}
              spacing={3}
          >
            <Tabs
                value={phase}
                onChange={handleChangePhase}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                {phasesTabs.map((tab, index) => (
                    <Tab key={index} icon={tab.icon} label={tab.label} />
                ))}
            </Tabs>
            <Tabs
                value={day}
                onChange={handleChangeDay}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                {daysTabs.map((tab, index) => (
                    <Tab key={index} icon={tab.icon} label={tab.label} />
                ))}
            </Tabs>
            <Stack
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    overflow: 'auto',
                }}
                spacing={3}
            >
                {children}
            </Stack>
          </Stack>
        );
    }
          

    if (loading) {
        return (
          <RenderTabs>
            <Typography
                  color="text.primary"
                  variant="h2"
                  fontWeight={700}
              >
                  Loading...
              </Typography>
          </RenderTabs>
        );
    }

    if (success) {
        return (
          <RenderTabs>
              {activities.map((activity, index) => (
                  <ActivityCard key={index} activityId={activity.id} admissionId={admissionId} />
              ))}
              {
                  activities.length === 0 &&
                  <Typography
                      color="text.primary"
                      variant="h4"
                      fontWeight={700}
                  >
                      No activities found.
                  </Typography>

              }
          </RenderTabs>
        );
    }

    return (
      <RenderTabs>
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
              We couldnt load the activities.
          </Typography>
          <Typography
              color="textSecondary"
              variant="subtitle1"
              fontWeight={500}
          >
              Please try again.
          </Typography>
      </RenderTabs>
    );
}