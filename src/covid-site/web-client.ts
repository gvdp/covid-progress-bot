import {getProgressFromPage} from "./page-scraper";
const axios = require("axios");


export async function getCurrentProgress(): Promise<number> {
	const webPage = await axios.get('https://covid-vaccinatie.be/nl').then(response => response.data)
	return getProgressFromPage(webPage)
}

