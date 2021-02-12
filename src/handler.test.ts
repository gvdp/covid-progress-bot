import {handler} from "./handler";

process.env.COVID_API_URL='http://localhost:3721'
process.env.TWITTER_API_URL='http://localhost:3721'

test('should call covid and twitter api on running handler', async () => {
	await handler()
})
