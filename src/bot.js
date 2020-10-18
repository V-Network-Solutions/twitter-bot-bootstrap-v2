// listen on port so now.sh likes it
const { createServer } = require('http')

// bot features
// due to the Twitter ToS automation of likes
// is no longer allowed, so:
const Twit = require('twit')
const config = require('./config')
const log4jConfig = require('./log4jConfig')

// Start Logging
const consoleLol = require('console.lol')
const log4js = require('log4js')
log4js.configure(log4jConfig.options)
const logger = log4js.getLogger()

// Set log levels to match user env file setting
logger.level = config.envVars.logLevel.toUpperCase()
logger.trace('📝 Starting to log: bot.js')

const bot = new Twit(config.twitterKeys)

const retweet = require('./api/retweet')
const reply = require('./api/reply')

console.rofl('Bot starting...')
logger.trace('🚀 Twitter Bot v2 Starting...')


logger.trace('🟢 Start Retweets')
retweet()
logger.trace('🟢 Starting retweet loop')
logger.debug('🐛 Setting retweet interval to: ' + config.envVars.retweet)
setInterval(retweet, config.envVars.retweet)

// These next lines will reply to new follower.
logger.trace('🟢 Starting to follow userStream')
const userStream = bot.stream('statuses/filter', { track: `@${config.envVars.username}` });
logger.trace('🟢 On follow run reply function')
userStream.on('follow', reply)

// This will allow the bot to run on now.sh and in a docker image on Azure
logger.trace('🟢 Creating the app server')
const server = createServer((req, res) => {
    res.writeHead(302, {
        Location: `https://twitter.com/@${config.envVars.username}`
    })
    res.end()
})

logger.trace('🕵️‍♂️ Checking if port is defined or customized')
logger.debug('🐛 The current environment server port is: ' + process.env.PORT)
if (process.env.PORT === undefined || process.env.PORT === null)
    process.env.PORT = config.envVars.localPort
logger.debug('🐛 The server port is now: ' + process.env.PORT)

logger.trace('🟢 Starting to listen on port: ' + process.env.PORT)
server.listen(process.env.PORT)

logger.trace('🛑 Shutting down log4js and then closing server ')
server.close(log4js.shutdown())