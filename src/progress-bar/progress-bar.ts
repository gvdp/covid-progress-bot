const completed = '█'
const uncompleted = '░'

export function getProgressFromTweet(tweetText: string): number {
	return Number(tweetText.replace(/[█░%]/g, ''))
}

export function convertProgressToTextBar(progress: number, numberOfChars = 25): string {
	const numberOfCompletedBars = Math.max(Math.floor((progress / 100) * numberOfChars), 1)
	const progressBar = completed.repeat(numberOfCompletedBars) + uncompleted.repeat(numberOfChars - numberOfCompletedBars)
	return progressBar + ' ' + progress + '%'
}
