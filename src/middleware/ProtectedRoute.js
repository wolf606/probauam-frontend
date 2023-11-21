"use client";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, role }) {
    const session = useSelector((state) => state.authReducer.session);
    if (session === null) {
        redirect('/auth/signin');
        return null;
    } else if (role !== "any") {
        if (!session.role.includes(role)) {
            console.log("User Role: ", session.role);
            console.log("Required Role: ", role);
            redirect('/');
            return null;
        }
    }
    return children;
}