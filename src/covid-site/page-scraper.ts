const cheerio = require('cheerio')


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
