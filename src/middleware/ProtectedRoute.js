import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function ProtectedRoute({ children }) {
    const session = await getServerSession();
    if (!session) {
        redirect("/api/auth/signin");
    }
    return children;
}