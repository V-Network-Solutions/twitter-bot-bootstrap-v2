/**
 * config module.
 * @desc This module exports the environment configuration options for the project
 * @module config
 * @requires dotenv
 */
require('dotenv').config()

module.exports = {
    twitterKeys: {
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token: process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    },
    envVars: {
        queryString: process.env.QUERY_STRING,
        resultType: process.env.RESULT_TYPE,
        language: process.env.TWITTER_LANG,
        username: process.env.TWITTER_USERNAME,
        retweet: process.env.TWITTER_RETWEET_RATE * 1000 * 60,
        like: process.env.TWITTER_LIKE_RATE * 1000 * 60,
        quote: process.env.TWITTER_QUOTE_RATE * 1000 * 60,
        searchCount: process.env.TWITTER_SEARCH_COUNT,
        randomReply: process.env.RANDOM_REPLY,
        logDir: process.env.LOG_DIR,
        localPort: process.env.LOCAL_PORT,
        logLevel: process.env.LOG_LEVEL,
        tweetLog: strToBool(process.env.TWEET_LOG),
        skipCount: process.env.SKIP_COUNT,
        traceStoreAndBind: strToBool(process.env.TRACE_storeWordAndBind),
        tuneBot: strToBool(process.env.TUNE_BOT)
    }
}

function strToBool(str) {
    return str.toLowerCase() == "true"
}