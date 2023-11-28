"use server";
import {
    sendReqJson
} from "@utils/http";

const BASE_URL = process.env.API_URL;

export const getUser = async (id, token) => {
    const url = `${BASE_URL}/api/v1/users/${id}`;
    return await sendReqJson(url, "GET", token);
}

export const getUserEntitiesProfessional = async (id, token) => {
    const url = `${BASE_URL}/api/v1/users/${id}/entities?active=true&cargo=employee`;
    return await sendReqJson(url, "GET", token);
}

export const getEntityProfessionalAdmissions = async (entityId, userId, token) => {
    //http://localhost:3900/api/v1/entities/65559e386d11b629feee0a77/professional/6554d32ecf28c01a2824cf08/admissions?active=true
    const url = `${BASE_URL}/api/v1/entities/${entityId}/professional/${userId}/admissions?active=true`;
    return await sendReqJson(url, "GET", token);
}

export const showAdmission = async (admissionId, token) => {
    //http://localhost:3900/api/v1/admissions/655699fd40415c34eced85bb
    const url = `${BASE_URL}/api/v1/admissions/${admissionId}`;
    return await sendReqJson(url, "GET", token);
}

export const showActivity = async (activityId, token) => {
    //http://localhost:3900/api/v1/activities/65641ce9fa0014a61222c216
    const url = `${BASE_URL}/api/v1/activities/${activityId}`;
    return await sendReqJson(url, "GET", token);
}

export const getBestScore = async (activityId, admissionId, token) => {
    //http://localhost:3900/api/v1/activities/65641ce9fa0014a61222c216/admissions/6563f662b8a2d12503a5c9eb/bestscore
    const url = `${BASE_URL}/api/v1/activities/${activityId}/admissions/${admissionId}/bestscore`;
    return await sendReqJson(url, "GET", token);
}

export const getAllScoresFromActivityAdmission = async (activityId, admissionId, token) => {
    //http://localhost:3900/api/v1/activities/65641ce9fa0014a61222c216/admissions/6563f662b8a2d12503a5c9eb/scoreboards
    const url = `${BASE_URL}/api/v1/activities/${activityId}/admissions/${admissionId}/scoreboards`;
    return await sendReqJson(url, "GET", token);
}

export const indexActivities = async (phase, day, token) => {
    //http://localhost:3900/api/v1/activities?phase=2&day=2
    const url = `${BASE_URL}/api/v1/activities?phase=${phase}&day=${day}`;
    return await sendReqJson(url, "GET", token);
}