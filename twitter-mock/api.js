console.log('started mock')


const tweets = [
	{
		'created_at': 'Thu Apr 06 15:45:43 +0000 2017',
		'text': '█░░░░░░░░░░░░░░░░░░░░░░░ 2.321%',
	},
]

const config = {
	'GET /1.1/statuses/user_timeline.json': (req, res) => {
		return res.json(tweets)
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
