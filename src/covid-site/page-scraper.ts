const cheerio = require('cheerio')

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


// Deprecated => using api now
export function getProgressFromPage(page: string): number {
	const $ = cheerio.load(page)

	const htmlNodeContainingValue = $('.card-body .pb-3')
					.filter((i, cardHeader) => {
						return $(cardHeader).text().trim() === 'volledig gevaccineerd'
					})
					.first()
					.parents('.card-body').first()
					.find('.row.mb-2')
					.filter((i, rowEl) => {
						return $(rowEl).text().includes('Vaccinatiegraad')
					})
					.first()

	const cleanValue: string = htmlNodeContainingValue.text().replace('Vaccinatiegraad', '')
					.replace('%', '')
					.replace(',', '.').trim();

	console.log('Percentage in html: ', cleanValue)
	const progressFromPage = Number(cleanValue)
	if (!isValidPercentage(progressFromPage)) throw new Error(`Scraping went weird, returns ${progressFromPage}`)
	return progressFromPage
}

function isValidPercentage(progress: number): boolean {
	return progress > 0 && progress < 100
}
