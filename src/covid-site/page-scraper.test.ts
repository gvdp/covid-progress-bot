import {getProgressFromResponse} from "./page-scraper";

const fs = require('fs')
const path = require('path')


test('should calculate progress from json response', () => {
	let testResponse = path.resolve(process.cwd(), 'test-data/api-response.json');
	const testResponseFile = fs.readFileSync(testResponse.toString())

	expect(getProgressFromResponse(JSON.parse(testResponseFile.toString()))).toEqual(1.03)
})
