const completed = '█'
const uncompleted = '░'

export function getProgressFromTweet(tweetText: string): number {
	if (!tweetText) {
		return 0
	}
	const progress = Number(tweetText.replace(/[█░%]/g, ''));
	return !isNaN(progress) ? progress : 0
}

export function convertProgressToTextBar(progress: number, numberOfChars = 25): string {
	const numberOfCompletedBars = Math.max(Math.floor((progress / 100) * numberOfChars), 1)
	const progressBar = completed.repeat(numberOfCompletedBars) + uncompleted.repeat(numberOfChars - numberOfCompletedBars)
	return progressBar + ' ' + progress + '%'
}


export function shouldItBeTweeted(progress: number, lastProgress: number) {
	return progress > 1 && progress > lastProgress;
}
