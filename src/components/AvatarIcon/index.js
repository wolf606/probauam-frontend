"use client";
import {useState, useEffect} from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import {
  sendReqGetPic
} from "@utils/http";

export default function AvatarIcon() {
  
  const { data: session, status } = useSession();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if(session) {
      setAvatarUrl(session.avatar);
      if (avatarUrl !== null && avatarUrl !== undefined) {
        sendReqGetPic(avatarUrl, session.accessToken).then((res) => {
          const url = URL.createObjectURL(res);
          setAvatar(url);
        });
      }
    }
  }, [session, avatarUrl]);

  return (
    avatar !== null && avatar !== undefined ? <Image
      alt={"avatar"}
      src={avatar}
      width={40}
      height={40}
      style={{
        borderRadius: "50%",
        cursor: "pointer",
      }}
    /> : <AccountCircle/>
  );
}
