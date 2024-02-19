import { NextAuthOptions } from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import GitHubProvider from "next-auth/providers/github";
import { getServerSession } from "next-auth";

import { fetchRedis } from "@/shared/api";
import { db, getCredentials } from "@/shared/config";

export enum AuthType {
	Google = "GOOGLE",
	X = "TWITTER",
	GitHub = "GITHUB",
}

export type User = {
	name: string;
	email: string;
	image: string;
	id: string;
};

export const authOptions: NextAuthOptions = {
	adapter: UpstashRedisAdapter(db),
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/login",
	},
	providers: [
		GoogleProvider({
			clientId:  getCredentials(AuthType.Google).clientId!,
			clientSecret: getCredentials(AuthType.Google).clientSecret!,
		}),
		TwitterProvider({
			clientId: getCredentials(AuthType.X).clientId!,
			clientSecret: getCredentials(AuthType.X).clientSecret!,
			version: "2.0",
		}),
		GitHubProvider({
			clientId: getCredentials(AuthType.GitHub).clientId!,
			clientSecret: getCredentials(AuthType.GitHub).clientSecret!,
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			const dbUserResult = (await fetchRedis("get", `user:${token.id}`)) as
				| string
				| null;

			if (!dbUserResult) {
				if (user) {
					token.id = user!.id;
				}

				return token;
			}

			const dbUser = JSON.parse(dbUserResult) as User;

			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				picture: dbUser.image,
			};
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.image = token.picture;
			}

			return session;
		},
		redirect() {
			return "/dashboard";
		},
	},
};

export const getSession = async () => getServerSession(authOptions);
