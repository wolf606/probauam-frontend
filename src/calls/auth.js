"use server";
import {
    sendReqJson
} from "@utils/http";

const BASE_URL = process.env.API_URL;

export const login = async (email, password) => {
    const url = `${BASE_URL}/api/v1/login`;
    const body = {
        email,
        password,
    };
    return await sendReqJson(url, "POST", null, body);
}

export const resetPassword = async (uid, token, password) => {
    const url = `${BASE_URL}/api/v1/auth/reset-password/${uid}/${token}`;
    const body = {
        password,
    };
    return await sendReqJson(url, "POST", null, body);
}

export const forgotPassword = async (email) => {
    const url = `${BASE_URL}/api/v1/auth/reset-password`;
    return await sendReqJson(url, "POST", null, { email });
}

export const activateAccount = async (uid, token) => {
    const url = `${BASE_URL}/api/v1/auth/activate/${uid}/${token}`;
    return await sendReqJson(url, "GET", null);
}