import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const options: AuthOptions = {
    session: {
        strategy: "jwt",

    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log(credentials)
                const { password } = credentials as {
                    password: string;
                };
                const user = await prisma.user.findUnique({ where: { email: "diljith2003@gmail.com" }, select: { password: true } });
                const match = await bcrypt.compare(password, user.password);
                if (match)
                    return { id: "1", name: "Diljith P D", email: "diljith2003@gmail.com", role: "admin" };
                else
                    return null;
            },
        }),
    ],
}