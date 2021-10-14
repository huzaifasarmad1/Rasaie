var winston = require('winston');
// winston.emitErrs = true;
const mongoCon = process.env.mongoCon;
require('winston-mongodb');
var logger = winston.createLogger({
    transports: [
        // new winston.transports.File({
        //     level: 'info',
        //     filename: './logs/all-logs.log',
        //     handleExceptions: true,
        //     json: true,
        //     maxsize: 5242880, //5MB
        //     maxFiles: 5,
        //     colorize: false
        // }),

        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        }),
        // new(winston.transports.MongoDB)({
        //     db : mongoCon,
        //     collection: 'logs',
        //     options: {
        //         useNewUrlParser: true,
        //     },
        // })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function (message) {
        logger.info(message);
    }
};