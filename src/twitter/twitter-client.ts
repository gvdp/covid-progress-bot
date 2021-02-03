import axios from "axios";

const oauth = require('oauth-signature')

const twitterApi = axios.create({
	baseURL: process.env.TWITTER_API_URL,
});

const bearerConfig = {
	headers: {Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`}
};

const statusUpdateEndpoint = '/1.1/statuses/update.json'
const statusEndpointUrl = `${process.env.TWITTER_API_URL}${statusUpdateEndpoint}`;
const oauthConsumerKey = process.env.consumer_key;
const oauthToken = process.env.token;
const consumerSecret = process.env.consumer_secret;
const tokenSecret = process.env.secret;

export async function getLatestTweet() {
	const twitterBotName = 'covidvaccins_be'
	const listResponse = await twitterApi.get('/1.1/statuses/user_timeline.json?screen_name=' + twitterBotName, bearerConfig)
					.then(resp => resp.data)
	return listResponse.length && listResponse[0].text
}


export async function tweet(tweetText: string) {
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

function randomString(length) {
	const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	let result = '';
	for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
}
