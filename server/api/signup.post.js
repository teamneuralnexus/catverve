export default defineEventHandler(async (event) => {
	const { fullname, mail, password } = await readBody(event);
	// basic check
	if (
		typeof fullname !== "string"
	) {
		throw createError({
			message: "Invalid fullname",
			statusCode: 400
		});
	}
    if (
		typeof mail !== "string"
	) {
		throw createError({
			message: "Invalid mail",
			statusCode: 400
		});
	}
	if (
		typeof password !== "string" ||
		password.length < 6 ||
		password.length > 255
	) {
		throw createError({
			message: "Invalid password",
			statusCode: 400
		});
	}
    console.log(mail.toLowerCase())
	try {
		const user = await auth.createUser({
			key: {
				providerId: "username", // auth method
				providerUserId: mail.toLowerCase(), // unique id when using "username" auth method
				password // hashed by Lucia
			},
			attributes: {
                mail,
                fullname
			}
		});
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		const authRequest = auth.handleRequest(event);
		authRequest.setSession(session);
		return sendRedirect(event, "/"); // redirect to profile page
	} catch (e) {
		console.log(e)
		throw createError({
			message: "An unknown error occurred",
			statusCode: 500
		});
	}
});