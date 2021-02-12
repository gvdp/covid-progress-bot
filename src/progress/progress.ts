import {CovidApiResponse} from "../web/covid-api";

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

export function shouldItBeTweeted(progress: number, lastProgress: number): boolean {
	return progress > 1 && progress > lastProgress;
}

export function getProgressFromResponse(jsonResponse: CovidApiResponse): number {

	const sum = (a, b) => a + b
	const totalSecondDoses = jsonResponse.result.administered
					.map(measurement => measurement.second_dose)
					.reduce(sum, 0)

	console.log('Total second doses administered: ', totalSecondDoses)
	const totalPopulation = 11492641;
	return Math.round((totalSecondDoses / totalPopulation) * 10000) / 100
}
