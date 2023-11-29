"use server";
export async function getApiUrl() {
  return process.env.API_URL;
}