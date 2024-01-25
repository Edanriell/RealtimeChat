import { NextAuthOptions } from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import GitHubProvider from "next-auth/providers/github";
import { getServerSession } from "next-auth";

import { fetchRedis } from "@/shared/api";
import { db } from "@/shared/config";

type CredentialConfig = {
	clientIdEnv: string;
	clientSecretEnv: string;
};

export enum AuthType {
	Google = "Google",
	X = "Twitter",
	GitHub = "GitHub",
}

export type User = {
	name: string;
	email: string;
	image: string;
	id: string;
};

const credentialConfigs: Record<AuthType, CredentialConfig> = {
	[AuthType.Google]: {
		clientIdEnv: "GOOGLE_CLIENT_ID",
		clientSecretEnv: "GOOGLE_CLIENT_SECRET",
	},
	[AuthType.X]: {
		clientIdEnv: "TWITTER_CLIENT_ID",
		clientSecretEnv: "TWITTER_CLIENT_SECRET",
	},
	[AuthType.GitHub]: {
		clientIdEnv: "GITHUB_CLIENT_ID",
		clientSecretEnv: "GITHUB_CLIENT_SECRET",
	},
};

function getCredentials(authType: AuthType) {
	const { clientIdEnv, clientSecretEnv } = credentialConfigs[authType];

	const clientId = process.env[clientIdEnv];
	const clientSecret = process.env[clientSecretEnv];

	if (!clientId || clientId.length === 0) {
		throw new Error(`Missing ${clientIdEnv}`);
	}

	if (!clientSecret || clientSecret.length === 0) {
		throw new Error(`Missing ${clientSecretEnv}`);
	}

	return { clientId, clientSecret };
}

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
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		TwitterProvider({
			clientId: process.env.TWITTER_CLIENT_ID!,
			clientSecret: process.env.TWITTER_CLIENT_SECRET!,
			version: "2.0",
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
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
