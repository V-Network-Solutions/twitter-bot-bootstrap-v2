/**
 * @module helpers/isReply
 * @desc Checks a tweet to see if it has been been retweeted already.
 * @param {object} tweet - Twitter message being brought in for evaluation.
 * @returns {Boolean} If any of the reply checks come back as true then return false otherwise return true that it is a reply. 
 */
const isReply = tweet => {
    const RT = require('./strings').RT

    if (
        RT.test(tweet.text) ||
        tweet.is_quote_status ||
        tweet.retweeted ||
        tweet.in_reply_to_status_id ||
        tweet.in_reply_to_status_id_str ||
        tweet.in_reply_to_user_id ||
        tweet.in_reply_to_user_id_str ||
        tweet.in_reply_to_screen_name
    )
        return true
}

module.exports = isReply