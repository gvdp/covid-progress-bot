const axios = require("axios");

const covidApi = axios.create({
	baseURL: process.env.COVID_API_URL,
});

export interface CovidApiResponse {
	result: {
		administered: {
			second_dose: number
		}[]
	}
}

export async function getCurrentProgress(): Promise<CovidApiResponse> {
	console.log('Fetching data from ', process.env.COVID_API_URL)
	return covidApi.get('/api/v1/administered.json').then(response => response.data)
}
