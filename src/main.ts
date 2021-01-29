import {getLatestTweet, tweet} from "./twitter/twitter-client";
import {getCurrentProgress} from "./covid-site/web-client";
import {convertProgressToTextBar, getProgressFromTweet} from "./progress-bar/progress-bar";


export async function main() {
	const progress: number = await getCurrentProgress()
	const lastProgress: number = getProgressFromTweet(await getLatestTweet())
	if (progress > lastProgress) {
		await tweet(convertProgressToTextBar(progress))
	} else {
		console.log('Already tweeted')
	}

}


