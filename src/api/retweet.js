const Twit = require('twit')
const unique = require('unique-random-array')
const config = require('../config')
const isReply = require('../helpers/isReply')
const isBanned = require('../helpers/isBanned')

const param = config.twitterConfig
const queryString = unique(param.queryString.split(','))

const bot = new Twit(config.twitterKeys)

const retweet = () => {
    const query = queryString()

    bot.get(
        'search/tweets', {
            q: query,
            result_type: param.resultType,
            lang: param.language,
            filter: 'safe',
            count: param.searchCount
        },
        (err, data, response) => {
            if (err) {
                console.lol('ERRORDERP: Cannot Search Tweet!, Description here: ', err)
            } else {
                let retweetId
                    // grab random tweet ID to retweet - desired range for random number is [0..data.statuses.length-1]
                let rando = Math.floor(Math.random() * data.statuses.length)
                while (isBanned(data.statuses[rando])) {
                    rando = Math.floor(Math.random() * data.statuses.length)
                }

                if (!isReply(data.statuses[rando])) {
                    retweetId = data.statuses[rando].id_str
                    bot.post(
                        'statuses/retweet/:id', {
                            id: retweetId
                        },
                        (err, response) => {
                            if (err) {
                                console.log(`failed with err retweetId ${retweetId} `)
                                console.lol('ERRORDERP: Retweet!')
                            }
                            console.lol(
                                'SUCCESS: RT: ',
                                data.statuses[rando].text,
                                'RANDO ID: ',
                                rando
                            )
                        }
                    )
                }
            }
        }
    )
}

module.exports = retweet