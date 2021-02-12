import axios from "axios";
const oauth = require('oauth-signature')

const twitterApi = axios.create({
	baseURL: process.env.TWITTER_API_URL || 'http://localhost:3721',
});

const bearerConfig = {
	headers: {Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`}
};

const statusUpdateEndpoint: string = '/1.1/statuses/update.json'
const statusEndpointUrl: string = `${process.env.TWITTER_API_URL}${statusUpdateEndpoint}`;
const oauthConsumerKey: string = process.env.consumer_key;
const oauthToken: string = process.env.token;
const consumerSecret: string = process.env.consumer_secret;
const tokenSecret: string = process.env.secret;

export async function getLatestTweet(): Promise<string> {
	const twitterBotName = 'covidvaccins_be'
	const listResponse = await twitterApi.get('/1.1/statuses/user_timeline.json?screen_name=' + twitterBotName, bearerConfig)
					.then(resp => resp.data)
	return listResponse.length && listResponse[0].text
}


export async function tweet(tweetText: string): Promise<void> {
	console.log('Tweeting', tweetText)

	const httpMethod = 'POST';
	const date = Math.round(new Date().getTime() / 1000);
	const oauthNonce = randomString(32);
	const parameters = {
		oauth_consumer_key: oauthConsumerKey,
		oauth_token: oauthToken,
		oauth_nonce: oauthNonce,
		oauth_timestamp: date,
		oauth_signature_method: 'HMAC-SHA1',
		oauth_version: '1.0',
		status: tweetText
	};

	const encodedSignature = oauth.generate(httpMethod, statusEndpointUrl, parameters, consumerSecret, tokenSecret);
	const oauthHeader = `OAuth oauth_consumer_key="${oauthConsumerKey}", ` +
					`oauth_nonce="${oauthNonce}", ` +
					`oauth_signature="${encodedSignature}", ` +
					`oauth_signature_method="HMAC-SHA1", ` +
					`oauth_timestamp="${date}", ` +
					`oauth_token="${encodeURIComponent(oauthToken)}", ` +
					`oauth_version="1.0"`

	try {
		await twitterApi.post('/1.1/statuses/update.json', null, {
			params: {status: tweetText},
			headers: {Authorization: oauthHeader},
		})
		console.log('Tweeted')
	} catch (e) {
		console.error(e.response.data)
		throw new Error('Tweeting failed')
	}
}

function randomString(length: number): string {
	const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	let result = '';
	for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
}
