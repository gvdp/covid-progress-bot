import {convertProgressToTextBar, getProgressFromTweet, shouldItBeTweeted} from "./progress-bar";


test('should parse number from tweet text', () => {
	expect(getProgressFromTweet('█░░░░░░░░░░░░░░░░░░░░░░░░ 2.821%')).toEqual(2.821)
})


it('should transform percentage in progress text', () => {
	expect(convertProgressToTextBar(5, 10)).toEqual('█░░░░░░░░░ 5%')
	expect(convertProgressToTextBar(50, 10)).toEqual('█████░░░░░ 50%')
	expect(convertProgressToTextBar(59.23, 10)).toEqual('█████░░░░░ 59.23%')
	expect(convertProgressToTextBar(60, 10)).toEqual('██████░░░░ 60%')
	expect(convertProgressToTextBar(99, 10)).toEqual('█████████░ 99%')
	expect(convertProgressToTextBar(100, 10)).toEqual('██████████ 100%')
})


it('should tweet based on last and current progress', () => {
	expect(shouldItBeTweeted(2, 3)).toEqual(false)
	expect(shouldItBeTweeted(3, 2)).toEqual(true)
	expect(shouldItBeTweeted(.3, .2)).toEqual(false)
})
