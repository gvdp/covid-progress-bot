import {convertProgressToTextBar, getProgressFromResponse, getProgressFromTweet, shouldItBeTweeted} from "./progress";
const fs = require('fs')
const path = require('path')


test('should parse number from tweet text', () => {
	expect(getProgressFromTweet('█▓░░░░░░░░░░░░░░░░░░░░░░░ 2.821% / 3.234%')).toEqual({second: 2.821, first: 3.234})
	expect(getProgressFromTweet('█▓░░░░░░░░░░░░░░░░░░░░░░░ 2.821%')).toEqual({second: 2.821, first: 0})
})


test('should transform percentage in progress text', () => {
	expect(convertProgressToTextBar({first: 5, second: 5}, 10)).toEqual('█▓░░░░░░░░ 5% / 5%')
	expect(convertProgressToTextBar({first: 6, second: 5}, 10)).toEqual('█▓░░░░░░░░ 5% / 6%')
	expect(convertProgressToTextBar({first: 10, second: 5}, 10)).toEqual('█▓░░░░░░░░ 5% / 10%')
	expect(convertProgressToTextBar({first: 20, second: 5}, 10)).toEqual('█▓░░░░░░░░ 5% / 20%')
	expect(convertProgressToTextBar({first: 30, second: 5}, 10)).toEqual('█▓▓░░░░░░░ 5% / 30%')
	expect(convertProgressToTextBar({first: 50, second: 50}, 10)).toEqual('█████▓░░░░ 50% / 50%')
	expect(convertProgressToTextBar({first: 59.23 , second: 59.23}, 10)).toEqual('█████▓░░░░ 59.23% / 59.23%')
	expect(convertProgressToTextBar({first: 60, second: 60}, 10)).toEqual('██████▓░░░ 60% / 60%')
	expect(convertProgressToTextBar({first: 99, second: 99}, 10)).toEqual('█████████▓ 99% / 99%')
	expect(convertProgressToTextBar({first: 100, second: 100}, 10)).toEqual('██████████ 100% / 100%')
})


test('should tweet based on last and current progress', () => {
	expect(shouldItBeTweeted({first: 2 , second: 2},{first: 3  , second: 2})).toEqual(false)
	expect(shouldItBeTweeted({first: 2 , second: 2.5},{first: 3  , second: 2})).toEqual(true)
	expect(shouldItBeTweeted({first: 3 , second: 2},{first: 2.8, second: 2})).toEqual(false)
	expect(shouldItBeTweeted({first: 3 , second: 2},{first: 2.7, second: 2})).toEqual(true)
	expect(shouldItBeTweeted({first: .3, second: 2},{first: .2 , second: 2})).toEqual(false)
})


test('should calculate progress from json response', () => {
	let testResponse = path.resolve(process.cwd(), 'mock/test-data/api-response.json');
	const testResponseFile = fs.readFileSync(testResponse.toString())

	expect(getProgressFromResponse(JSON.parse(testResponseFile.toString()))).toEqual({first:2.97, second:1.03 })
})
