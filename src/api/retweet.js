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
let logger = log4js.getLogger('default')
if (config.envVars.tweetLog)
    logger = log4js.getLogger('default.tweets')

// Set log levels to match user env file setting
logger.level = config.envVars.logLevel.toUpperCase()
logger.trace('📝 Starting to log: retweet.js')

const param = config.envVars
const queryString = unique(param.queryString.split(','))

const bot = new Twit(config.twitterKeys)

const retweet = () => {
    logger.trace('✨ START NEW RETWEET ✨')
    const query = queryString()

    logger.trace('📝 searching tweets')
    logger.info(`Performing query search for: ${query}`)
    logger.debug(
        `result_type: ` + param.resultType + ' |---| ',
        `count: ` + param.searchCount
    )
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
                logger.error('Search for tweets failed with error message: ', err)
                logger.info('🗑 Search Tossed, Resetting Query')
                return
            }
            if (data.statuses.length === 0) {
                logger.warn('💥 data length is 0')
                logger.info('🗑 Search Tossed, Resetting Query')
                return
            }
            logger.debug(`Query completed successfully with data: ${data}`)
            let retweetId

            // grab random tweet ID number to retweet - desired range for random number is [0..data.statuses.length-1]
            logger.trace('🟢 Starting search for random post to check')
            let rando = Math.floor(Math.random() * data.statuses.length)
            logger.debug(`Rando was assigned to: ${rando}`)
            let skip = 0
            while (isBanned(data.statuses[rando]) || data.statuses[rando].text.length < 75) {
                if (skip > config.envVars.skipCount) {
                    logger.debug('🚮 SKIP TOO HIGH')
                    logger.debug(`📝 Skip is ${skip} now which is greater than the env var of ` + config.envVars.skipCount)
                    logger.info('🗑 Search Tossed, Resetting Query')
                    return
                }
                logger.trace('🔃 Getting new rando')
                rando = Math.floor(Math.random() * data.statuses.length)
                logger.debug(`Rando is now set to ${rando}`)
                skip++
                logger.debug(`Skip is now at: ${skip}`)
            }
            logger.trace('🏁 While loop checking tweet for illegal terms has completed')
            logger.debug(`While loop completed successfully with rando: ${rando}`)

            logger.trace('🕵️‍♂️ Checking if retweet is reply')
            if (!isReply(data.statuses[rando])) {
                logger.trace('🐦 Retweeting')

                logger.debug('Tweet is not a reply, setting retweetId')
                retweetId = data.statuses[rando].id_str
                logger.debug(`retweetId: ${retweetId}`)

                logger.trace('🐦 Posting Tweet')





                config.envVars.tuneBot ? logger.info('📰 RETWEETED: ' + data.statuses[rando].text) :
                    bot.post(
                        'statuses/retweet/:id', {
                            id: retweetId
                        },
                        (err, response) => {
                            logger.info('📰 RETWEETED: ' + data.statuses[rando].text)
                            if (err) {
                                logger.error(
                                    'An error occurred posting the tweet with the tweet: ',
                                    data.statuses[rando].text,
                                    'ERROR MSG: ',
                                    err
                                )
                                return
                            }
                            logger.debug(
                                'SUCCESS: RT: ',
                                data.statuses[rando].text,
                                'RANDO ID: ',
                                rando
                            )
                        }
                    )
                return
            }
            logger.info('🗑 Search Tossed, Resetting Query')
        }
    )
}

module.exports = retweet