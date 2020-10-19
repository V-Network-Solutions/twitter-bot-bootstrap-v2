const log4jConfig = require('../log4jConfig')

// Start Logging
const config = require('../config')
const log4js = require('log4js')
log4js.configure(log4jConfig.options)
const logger = log4js.getLogger('default.tweets')

// Set log levels to match user env file setting
logger.level = config.envVars.logLevel.toUpperCase()
logger.trace('📝 Starting to log: inBanned.js')

let word
const isBanned = tweet => {
    logger.trace('🟢 Starting No Banned Words Validation')
    const BannedWords = require('./strings').blackListedRetweetWords
    logger.trace(`🔃 Reset to BannedWords Var to false`)
    let bannedWords = false
    logger.debug(`The bannedWords var is now: ${bannedWords}`)

    logger.trace('🕵️‍♂️ Checking Tweet')
    logger.debug('📝 Tweet being evaluated: ' + tweet.text)
    if (BannedWords.some(badWord => storeWordAndBind(tweet.text, badWord))) {
        logger.debug(`🚫 Banned Word Found: ${word}`)
        bannedWords = true
        logger.debug(`The bannedWords var is now: ${bannedWords}`)
        logger.trace('✌️ Dipping out to maybe find another tweet.')
    }
    return bannedWords
}

function storeWordAndBind(text, badWord) {
    config.envVars.traceStoreAndBind ? logger.trace('📦 Binding and storing strings') : ''
    let ret = false
    config.envVars.traceStoreAndBind ? logger.trace(`Word is currently: ${word}`) : ''
    config.envVars.traceStoreAndBind ? logger.trace(`Var badWord being evaluated is: ${badWord}`) : ''
    word = badWord
    config.envVars.traceStoreAndBind ? logger.trace(`Word is now: ${word}`) : ''
    config.envVars.traceStoreAndBind ? logger.debug(`Is this statement '${word}' found in: ${text}`) : ''

    if (text.match(word))
        ret = true

    config.envVars.traceStoreAndBind ? logger.debug(`ret in StoreWordAndBind is being sent back as: ${ret} where false is good news`) : ''
    return ret
}

module.exports = isBanned