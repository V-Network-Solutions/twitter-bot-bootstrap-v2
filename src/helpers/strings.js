module.exports = {
    resultType: [
        'mixed',
        'recent',
        'popular'
    ],
    blackListUsers: [
        ''
    ],
    RT: /^RT/i,
    queryString: [
        'github.com',
        'twitter bots',
        'twitter bot bootstrap v2',
        '#twitterbot'
    ],
    blackListedWords: [
        /^RT|^HIGHLIGHTS|^@/i, // Keep this line at the top to improve performance
        /we hate bots/i,
        /die/i
    ]
};