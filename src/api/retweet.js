const Twit = require('twit')
const unique = require('unique-random-array')
const config = require('../config')
const isReply = require('../helpers/isReply')
const isBanned = require('../helpers/isBanned')
const log4jConfig = require('../log4jConfig')

// Start Logging
const consoleLol = require('console.lol')
const log4js = require('log4js')
log4js.configure(log4jConfig.options)
const logger = log4js.getLogger('default.tweets')

// Set log levels to match user env file setting
logger.level = config.envVars.logLevel.toUpperCase()
logger.trace('📝 Starting to log: retweet.js')

const param = config.envVars
const queryString = unique(param.queryString.split(','))

const bot = new Twit(config.twitterKeys)

const retweet = () => {
    logger.trace('🟢 Retweet Starting')
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
                logger.error('Search for tweets failed with message: ', err)
                return
                //! console.lol('ERRORDERP: Cannot Search Tweet!, Description here: ', err)
            }
            let retweetId

            // grab random tweet ID number to retweet - desired range for random number is [0..data.statuses.length-1]
            logger.trace('🟢 Starting search for random post to check')
            let rando = Math.floor(Math.random() * data.statuses.length)
            logger.debug(`Rando was assigned to: ${rando}`)
            while (isBanned(data.statuses[rando])) {
                logger.trace('Getting new rando number')
                rando = Math.floor(Math.random() * data.statuses.length)
                logger.debug(`Rando is now set to ${rando}`)
            }
            logger.trace('While loop checking tweet for illegal terms has completed')
            logger.debug(`While loop completed successfully with rando: ${rando}`)

            logger.trace('🕵️‍♂️ Checking if retweet is reply')
            if (!isReply(data.statuses[rando])) {
                logger.trace('🐦 Retweeting')

                logger.debug('Tweet is not a reply, setting retweetId')
                retweetId = data.statuses[rando].id_str
                logger.debug(`retweetId: ${retweetId}`)

                logger.trace('Posting Tweet')
                bot.post(
                    'statuses/retweet/:id', {
                        id: retweetId
                    },
                    (err, response) => {
                        if (err) {
                            logger.error(
                                'An error occurred posting the tweet with the tweet: ',
                                data.statuses[rando].text,
                                'ERROR MSG: ',
                                err
                            )
                        }
                        logger.debug(
                            'SUCCESS: RT: ',
                            data.statuses[rando].text,
                            'RANDO ID: ',
                            rando
                        )
                    }
                )
            }
        }
    )
}

module.exports = retweet