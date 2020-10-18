const config = require('./config')

module.exports = {
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