import {jwtDecode} from "jwt-decode";

export function verifyToken(token) {
    try {
        const decoded = jwtDecode(token);
        if (decoded.exp < Date.now() / 1000) {
            console.log("Token has expired.");
            return null;
        }
        return decoded;
    } catch (error) {
        console.log("Invalid token in verifyToken: ", error);
        return null;
    }
}