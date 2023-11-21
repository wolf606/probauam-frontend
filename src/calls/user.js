"use server";
import {
    sendReqJson
} from "@utils/http";

const BASE_URL = process.env.API_URL;

export const getUser = async (id, token) => {
    const url = `${BASE_URL}/api/v1/users/${id}`;
    return await sendReqJson(url, "GET", token);
}