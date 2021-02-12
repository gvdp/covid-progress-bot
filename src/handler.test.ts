import {handler} from "./handler";

test('should call covid and twitter api on running handler', async () => {
	await handler()
})
