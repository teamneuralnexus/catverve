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
    const body = await readBody(event)
    const userId = session?.user.userId
    const results = sql`select * from jobs where worker_id=${body.worker_id}`
    return results
})