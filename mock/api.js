console.log('started mock')


const tweets = require('../test-data/last-tweet-response.json')

console.log(tweets)
const covidApiResponse = require('../test-data/api-response.json')

const config = {
	'HEAD /': (req, res) => {
		return res.json('OK')
	},
	'GET /1.1/statuses/user_timeline.json': (req, res) => {
		return res.json(tweets)
	},
	'GET /api/v1/administered.json': (req, res) => {
		return res.json(covidApiResponse)
	},
	'POST /1.1/statuses/update.json': (req, res) => {
		tweets.unshift({
			'created_at': new Date(),
			'text': req.query.status,
		})
		return res.json()
	},
}

module.exports = config
