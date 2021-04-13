const axios = require("axios");

const covidApi = axios.create({
	baseURL: process.env.COVID_API_URL || 'http://localhost:3721',
});


export interface CovidApiResponse {
	result: {
		administered: {
			first_dose: number
			second_dose: number
		}[]
	}
}

export async function getCurrentProgress(): Promise<CovidApiResponse> {
	console.log('Fetching data from ', covidApi.defaults.baseURL)
	return covidApi.get('/api/v1/administered.json').then(response => response.data)
					.catch((error) => {
						console.error('Api call failed')
						throw new Error(`Call failed with status ${error.response.status}`)
					})
}
