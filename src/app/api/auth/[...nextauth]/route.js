import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {login} from "@calls/auth";
import {verifyToken} from "@utils/jwt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                const data = await login(credentials.email, credentials.password);
                if (data !== null) {
                    if (data.hasOwnProperty("accessToken")) {
                        const decoded = verifyToken(data.accessToken);
                        if (decoded !== null) {
                            return {
                                id: decoded.id,
                                email: decoded.email,
                                role: decoded.role,
                                exp: decoded.exp,
                                token: data.accessToken,
                                avatar: decoded.avatar,
                                names: decoded.names,
                            }
                        }
                        return null;
                    } else {
                        console.debug("Res with no success: ", data);
                        return null;
                    }
                }
                return null;
            }
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.token = user.token;
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
                token.exp = user.exp;
                token.avatar = user.avatar;
                token.names = user.names;
            }
            return token;
        },
        async session({session, token}) {
            session.token = token.token;
            session.id = token.id;
            session.email = token.email;
            session.role = token.role;
            session.exp = token.exp;
            session.avatar = token.avatar;
            session.names = token.names;
            return session;
        }
    },
}

export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}