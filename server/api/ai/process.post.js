import Replicate from "replicate";

export default defineEventHandler(async (event)=>{
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
    const formData = await readFormData(event)
    const files = formData.getAll('attachments')
    console.log(files)

    const new_worker = await sql`insert into worker(user_id, status) values(${userId}, ${"Started"}) returning id`
    console.log(new_worker[0].id)
    const config = useRuntimeConfig()
    const REPLICATE_API_TOKEN=config.replicate
    const replicate = new Replicate({
    auth: REPLICATE_API_TOKEN,
    });
    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const output = await replicate.run(
            "yorickvp/llava-13b:a0fdc44e4f2e1f20f2bb4e27846899953ac8e66c5886c5878fa1d6b73ce009e5",
            {
              input: {
                image: "https://innohacks.aisnippets.tech/test.jpg",
                top_p: 1,
                prompt: `You are a product catalogue quality assurance expert. Tell me in true or false for the following parameters in json if the ans is right or not
                {
                    isImageCentred: ,
                    isPricingThere: ,
                    materialQuality: In the description if material and quality is mentioned say true else false,
                    bestSeller: Is best seller there or not,
                    emotionalTriggers: If words in ['comfortable', 'intelligent', 'inspiring'] say true else false,
                    sensoryLanguage: If words in ['fragnant', 'silky', 'crisp'] say true else false,
                    sizeAndDimensions: If size and dimensions mentioned or not say true else false,
                    reccomendations: Suggest upto a small para of reccomendations which can improve the catalogue,
                }`,
                max_tokens: 1024,
                temperature: 0.2
              }
            }
          );
        const parameters = JSON.parse(output.join(''))
        // const dummyparamters = {
        //     isImageCentred: true,
        //     isPricingThere: true,
        //     materialQuality: false,
        //     bestSeller: true,
        //     emotionalTriggers: true,
        //     sensoryLanguage: true,
        //     sizeAndDimensions: false,
        //     reccomendations: 'To improve the catalogue, consider adding more detailed descriptions of each product, including their ingredients, benefits, and usage instructions. Additionally, including customer reviews and testimonials can help build trust and credibility with potential customers. Finally, incorporating high-quality images and videos can enhance the visual appeal of the catalogue and showcase the products in more detail.',
        // }
        console.log(parameters);
        const job_id = await sql`insert into jobs(output, recommendations, rating, worker_id) values(${JSON.stringify(parameters)}, ${parameters.reccomendations}, 5, ${new_worker[0].id}) returning id`
        console.log(job_id)
    }
    return {
        worker_id: new_worker[0].id
    }
})