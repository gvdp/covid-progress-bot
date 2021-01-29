import {getProgressFromPage} from "./page-scraper";

const fs = require('fs')
const path = require('path')


test('should find progress percentage in webpage', () => {
	let testDataFile = path.resolve(process.cwd(), 'test-data/covid-site.html');
	const file = fs.readFileSync(testDataFile.toString())
	expect(getProgressFromPage(file.toString())).toEqual(2.821)
})
