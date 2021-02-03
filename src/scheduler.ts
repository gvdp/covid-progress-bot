require('dotenv').config()
import {handler} from "./handler";

setInterval(handler, 5000)
console.log('bot started')

