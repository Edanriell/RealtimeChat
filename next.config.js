/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["lh3.googleusercontent.com"],
	},
	env: {
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
		UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
		GOOGLE_CLIENT_IDL: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID,
		TWITTER_CLIENT_SECRET: process.env.TWITTER_CLIENT_SECRET,
		GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
		GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
		PUSHER_APP_ID: process.env.PUSHER_APP_ID,
		NEXT_PUBLIC_PUSHER_APP_KEY: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
		PUSHER_APP_SECRET: process.env.PUSHER_APP_SECRET,
	},
};

module.exports = nextConfig;
