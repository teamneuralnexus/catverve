export default defineEventHandler(async (event) => {
	const { mail, password } = await readBody(event);
	// basic check
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
	try {
		const key = await auth.useKey("username", mail.toLowerCase(), password);
		const session = await auth.createSession({
			userId: key.userId,
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