import {jwtDecode} from "jwt-decode";

export function verifyToken(token) {
    try {
        const decoded = jwtDecode(token);
        if (decoded.exp < Date.now() / 1000) {
            console.debug("Token has expired.");
            return null;
        }
        return decoded;
    } catch (error) {
        console.debug("Invalid token in verifyToken: ", error);
        return null;
    }
}