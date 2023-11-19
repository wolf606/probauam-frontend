
import {
    sendReqGetPic
} from "@utils/http";

export const getProfilePic = async (url, token) => {
    return await sendReqGetPic(url, token);
}