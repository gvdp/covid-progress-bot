require('dotenv').config()
import {handler} from "./handler";

(async () => {
	await handler();
})();
