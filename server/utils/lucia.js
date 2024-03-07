import { lucia } from "lucia";
import { h3 } from "lucia/middleware";
import { postgres as postgresAdapter } from "@lucia-auth/adapter-postgresql";
import postgres from "postgres";
import "lucia/polyfill/node";

const config = useRuntimeConfig()

export const sql = postgres(config.postgresConnectionString, {
    ssl: {
        rejectUnauthorized: false
    }
});

export const auth = lucia({
	env: "DEV", // "PROD" if deployed to HTTPS
	middleware: h3(),
	adapter: postgresAdapter(sql, {
		user: "auth_user",
		key: "user_key",
		session: "user_session"
	}),
    getUserAttributes: (data) => {
		return {
			mail: data.mail,
            fullname: data.fullname
		};
	}
});