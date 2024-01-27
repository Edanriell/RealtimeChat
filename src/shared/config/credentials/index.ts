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

export function getCredentials(authType: AuthType) {
	const { clientIdEnv, clientSecretEnv } = credentialConfigs[authType];

	if (!clientIdEnv || clientIdEnv.length === 0) {
		throw new Error(`Missing ${clientIdEnv}`);
	}

	if (!clientSecretEnv || clientSecretEnv.length === 0) {
		throw new Error(`Missing ${clientSecretEnv}`);
	}

	const clientId = process.env[clientIdEnv];
	const clientSecret = process.env[clientSecretEnv];

	return { clientId, clientSecret };
}
