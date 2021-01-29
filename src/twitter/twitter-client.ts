import axios from "axios";

const twitterApi = axios.create({
	// baseURL: 'https://api.twitter.com',
	baseURL: 'http://localhost:3721',
});

export async function getLatestTweet() {
	const twitterBotName = 'covidvaccins_be'
	// const listResponse = await twitterApi.get('/1.1/statuses/user_timeline.json?screen_name=' + twitterBotName).then(resp => resp.data)
	const listResponse = [{text: '█░░░░░░░░░░░░░░░░░░░░░░░ 2.321%'}]
	console.log(listResponse)
	return listResponse[0].text
}

export async function tweet(tweetText: string) {
	console.log('Tweeting', tweetText)
	// await twitterApi.post('/1.1/statuses/update.json', null, {params: {status: tweetText}})
	console.log('Tweeted')
}
