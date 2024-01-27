import NextAuth from "next-auth/next";

import { sessionModel } from "@/entities/session";

const { authOptions } = sessionModel;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
