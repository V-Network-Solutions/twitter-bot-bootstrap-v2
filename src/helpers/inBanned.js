const isBanned = tweet => {
    const BannedWords = require('./strings').blackListedWords
    if (BannedWords.some(tweet.text.match.bind(tweet.text)))
        return true
}

module.exports = isBanned