import {getLatestTweet, tweet} from "./twitter/twitter-client";
import {getCurrentProgress} from "./covid-site/web-client";
import {convertProgressToTextBar, getProgressFromTweet} from "./progress-bar/progress-bar";


export async function handler() {
	console.log('Executing check')
	try {
		const progress: number = await getCurrentProgress()
		const lastProgress: number = getProgressFromTweet(await getLatestTweet())
		console.log('Current Scraped Progress:', progress)
		console.log('Last Tweeted Progress:', lastProgress)
		if (progress > lastProgress) {
			await tweet(convertProgressToTextBar(progress))
		} else {
			console.log('Already tweeted')
		}
	} catch (e) {
		console.error('Something went wrong')
		console.error(e)
		throw new Error('Handle failed, failing lambda run')
	}
}


