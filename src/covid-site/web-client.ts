import {getProgressFromResponse} from "./page-scraper";

const axios = require("axios");

const covidApi = axios.create({
	baseURL: process.env.COVID_API_URL,
});

export async function getCurrentProgress(): Promise<number> {
	const response = await covidApi.get('/api/v1/administered.json').then(response => response.data)
	console.log('Api call done')
	return getProgressFromResponse(response)
}
