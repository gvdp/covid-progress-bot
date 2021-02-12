import {convertProgressToTextBar, getProgressFromResponse, getProgressFromTweet, shouldItBeTweeted} from "./progress";
const fs = require('fs')
const path = require('path')


test('should parse number from tweet text', () => {
	expect(getProgressFromTweet('█░░░░░░░░░░░░░░░░░░░░░░░░ 2.821%')).toEqual(2.821)
})


test('should transform percentage in progress text', () => {
	expect(convertProgressToTextBar(5, 10)).toEqual('█░░░░░░░░░ 5%')
	expect(convertProgressToTextBar(50, 10)).toEqual('█████░░░░░ 50%')
	expect(convertProgressToTextBar(59.23, 10)).toEqual('█████░░░░░ 59.23%')
	expect(convertProgressToTextBar(60, 10)).toEqual('██████░░░░ 60%')
	expect(convertProgressToTextBar(99, 10)).toEqual('█████████░ 99%')
	expect(convertProgressToTextBar(100, 10)).toEqual('██████████ 100%')
})


test('should tweet based on last and current progress', () => {
	expect(shouldItBeTweeted(2, 3)).toEqual(false)
	expect(shouldItBeTweeted(3, 2)).toEqual(true)
	expect(shouldItBeTweeted(.3, .2)).toEqual(false)
})


test('should calculate progress from json response', () => {
	let testResponse = path.resolve(process.cwd(), 'test-data/api-response.json');
	const testResponseFile = fs.readFileSync(testResponse.toString())

	expect(getProgressFromResponse(JSON.parse(testResponseFile.toString()))).toEqual(1.03)
})
