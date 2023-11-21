"use client";
import {useState, useEffect} from 'react';
import { Avatar } from '@mui/material';
import Image from 'next/image';
import {
  sendReqGetPic
} from "@utils/http";

export default function AvatarPicture({session}) {
  const [avatar, setAvatar] = useState(null);
  const [letter, setLetter] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (session !== null) {
        if (session.hasOwnProperty("avatar")) {
          const avatarUrl = session.avatar;
          if (avatarUrl !== null) {
            sendReqGetPic(avatarUrl)
            .then((res) => {
              setAvatar(URL.createObjectURL(res));
            })
          }
        }
  
        if (session.hasOwnProperty("names")) {
          setLetter(session.names[0]);
        }
      }
    };
    load();
  }, [session]);

  if (session === null) {
    <Avatar
          sx={{
            width: 40,
            height: 40,
            cursor: "pointer",
          }}
        >
    </Avatar>
  }

  return (
    <>
    {
      avatar !== null ? (
        <Image
          src={avatar}
          alt="user avatar"
          width={260}
          height={260}
          style={{
            borderRadius: '50%'
          }}
        />
      ) : (
        <Avatar
          sx={{
            width: 40,
            height: 40,
            cursor: "pointer",
          }}
        >
          {letter}
        </Avatar>
      )
    }
    </>
  )
}
