import {getLatestTweet, tweet} from "./web/twitter-api";
import {getCurrentProgress} from "./web/covid-api";
import {
	convertProgressToTextBar,
	getProgressFromResponse,
	getProgressFromTweet,
	shouldItBeTweeted
} from "./progress/progress";


export async function handler() {
	console.log('Executing check')
	try {
		const progress: number = getProgressFromResponse(await getCurrentProgress())
		const lastProgress: number = getProgressFromTweet(await getLatestTweet())
		console.log('Current Scraped Progress:', progress)
		console.log('Last Tweeted Progress:', lastProgress)
		if (shouldItBeTweeted(progress, lastProgress)) {
			await tweet(convertProgressToTextBar(progress))
		} else {
			console.log('No tweet sent')
		}
	} catch (e) {
		console.error('Something went wrong')
		console.error(e)
		throw new Error('Handle failed, failing lambda run')
	}
}


