import {CovidApiResponse} from "../web/covid-api";

const completed = '█'
const halfCompleted = '▓'
const uncompleted = '░'

export function getProgressFromTweet(tweetText: string): Progress {
	if (!tweetText) {
		return;
	}
	if (!tweetText.includes('/')) {
		return {second: Number(tweetText.replace(/[█░▓%]/g, '')), first: 0}
	}

	const percents = tweetText.replace(/[█░▓%]/g, '').split('/');

	return {second: Number(percents[0]), first: Number(percents[1])}
}

export interface Progress {
	first: number;
	second: number;
}

export function convertProgressToTextBar(progress: Progress, numberOfChars = 25): string {
	let progressBar
	if (progress.first === 100 && progress.second === 100) {
		progressBar = completed.repeat(numberOfChars)
	} else {

		const numberOfFullyCompletedBars = Math.max(Math.floor((progress.second / 100) * numberOfChars), 1)

		const numberOfHalfCompletedBars = Math.max(1, Math.floor((progress.first / 100) * numberOfChars) - numberOfFullyCompletedBars)

		let remainingBars = numberOfChars - numberOfFullyCompletedBars - numberOfHalfCompletedBars;
		progressBar = completed.repeat(numberOfFullyCompletedBars) +
						halfCompleted.repeat(numberOfHalfCompletedBars) +
						(remainingBars > 0 ? uncompleted.repeat(remainingBars) : '')
	}
	return progressBar + ' ' + progress.second + '% / ' + progress.first + '%'
}

export function shouldItBeTweeted(progress: Progress, lastProgress: Progress): boolean {
	return progress.first > 1 && progress.first - lastProgress.first > .25
					|| progress.second > 1 && progress.second - lastProgress.second > .25;
}

export function getProgressFromResponse(jsonResponse: CovidApiResponse): Progress {

	const sum = (a, b) => a + b
	const totalSecondDoses = jsonResponse.result.administered
					.map(measurement => measurement.second_dose)
					.reduce(sum, 0)
	const totalFirstDoses = jsonResponse.result.administered
					.map(measurement => measurement.first_dose)
					.reduce(sum, 0)

	console.log('Total second doses administered: ', totalSecondDoses)
	const totalPopulation = 11492641;
	return {
		second: Math.round((totalSecondDoses / totalPopulation) * 10000) / 100,
		first: Math.round((totalFirstDoses / totalPopulation) * 10000) / 100
	}
}
