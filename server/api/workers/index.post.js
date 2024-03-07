export default defineEventHandler(async (event) => {
    const authRequest = auth.handleRequest(event);
	// check if user is authenticated
	const session = await authRequest.validate();
    console.log(session)
	if (!session) {
		throw createError({
			message: "Unauthorized",
			statusCode: 401
		});
    }
    const userId = session?.user.userId
    const results = await sql`select * from worker where user_id=${userId}`
    console.log(results)
    return results
})