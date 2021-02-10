
interface CovidApiResponse {
	result: {
		administered: {
			second_dose: number
		}[]
	}
}

export function getProgressFromResponse(jsonResponse: CovidApiResponse) {

	const sum = (a, b) => a + b
	const totalSecondDoses = jsonResponse.result.administered
					.map(measurement => measurement.second_dose)
					.reduce(sum, 0)

	console.log('Total second doses administered: ', totalSecondDoses)
	const totalPopulation = 11492641;
	return Math.round((totalSecondDoses / totalPopulation) * 10000) / 100
}

