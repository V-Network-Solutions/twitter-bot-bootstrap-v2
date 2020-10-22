const config = require('./config')
module.exports = {
    /**
     * @module log4jConfig
     * @desc This module exports the log4j configuration options for the project
     * @requires module:config
     * @param {object} options These are various log options available 
     * @param {object} options.categories.default Wires up logging files for bot, errors and the console. Create with logger.getLogger()
     * @param {object} options.categories.default.tweets Adds tweet log to everything else along with default category. Create with logger.getLogger('default.tweets')
     */
    options: {
        appenders: {
            tweetsLog: {
                type: 'file',
                filename: config.envVars.logDir + '/tweets.log',
                keepFileExt: true,
                maxLogSize: 10 * 1024 * 1024,
                backups: 5,
                compress: true,
                flags: 'a+'
            },
            tweets: {
                type: 'logLevelFilter',
                level: 'INFO',
                appender: "tweetsLog"
            },
            errorLog: {
                type: 'file',
                filename: config.envVars.logDir + '/botErrors.log',
                keepFileExt: true,
                maxLogSize: 10 * 1024 * 1024,
                backups: 5,
                compress: true,
                flags: 'a+'
            },
            errors: {
                type: 'logLevelFilter',
                level: 'ERROR',
                appender: "errorLog"
            },
            twitterBotLog: {
                type: 'file',
                filename: config.envVars.logDir + '/bot.log',
                keepFileExt: true,
                maxLogSize: 10 * 1024 * 1024,
                backups: 5,
                compress: true,
                flags: 'a+'
            },
            logBot: {
                type: 'logLevelFilter',
                level: 'ALL',
                appender: "twitterBotLog"
            },
            console: {
                type: 'console'
            },
        },
        categories: {
            default: {
                appenders: [
                    'console',
                    'errors',
                    'logBot'
                ],
                level: 'all'
            },
            'default.tweets': {
                appenders: [
                    'tweets'
                ],
                level: 'all'
            }
        }
    }
}