import { NextAuthOptions } from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { db } from "./db";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import GitHubProvider from "next-auth/providers/github";
import { fetchRedis } from "@/helpers/redis";

// Should be place in entities/session
type CredentialConfig = {
	clientIdEnv: string;
	clientSecretEnv: string;
};

enum AuthType {
	Google = "GOOGLE",
	X = "TWITTER",
	GitHub = "GITHUB",
}

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
// Should be place in entities/session

// Should be place in entities/session
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
// Should be place in entities/session

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
			clientId: getCredentials(AuthType.Google).clientId,
			clientSecret: getCredentials(AuthType.Google).clientSecret,
		}),
		TwitterProvider({
			clientId: getCredentials(AuthType.X).clientId,
			clientSecret: getCredentials(AuthType.X).clientSecret,
			version: "2.0",
		}),
		GitHubProvider({
			clientId: getCredentials(AuthType.GitHub).clientId,
			clientSecret: getCredentials(AuthType.GitHub).clientSecret,
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
