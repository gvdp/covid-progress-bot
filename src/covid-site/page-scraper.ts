const cheerio = require('cheerio')


export function getProgressFromPage(page: string): number {
	const $ = cheerio.load(page)

	let message = $('.card-body .pb-3')
					.filter((i, cardHeader) => {
						return $(cardHeader).text().trim() === 'gedeeltelijk gevaccineerd'
					})
					.first()
					.parents('.card-body').first()
					.find('.row.mb-2').last()
					.find('.col-auto .ps-1')

	const progressFromPage = Number(message.html().replace('%', '').replace(',', '.'))

	if (!isValidPercentage(progressFromPage)) throw new Error(`Scraping went weird, returns ${progressFromPage}`)

	return progressFromPage
}

function isValidPercentage(progress: number): boolean {
	return progress > 0 && progress < 100
}
