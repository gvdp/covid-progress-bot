import {getLatestTweet, tweet} from "./twitter/twitter-client";
import {getCurrentProgress} from "./covid-site/web-client";
import {convertProgressToTextBar, getProgressFromTweet} from "./progress-bar/progress-bar";


export async function handler() {
	console.log('Executing check')

	try {

		const progress: number = await getCurrentProgress()
		const lastProgress: number = getProgressFromTweet(await getLatestTweet())
		if (progress > lastProgress) {
			await tweet(convertProgressToTextBar(progress))
		} else {
			console.log('Already tweeted')
		}
	} catch (e) {
		console.log('Something went wrong')
		console.log(e)
	}

}


