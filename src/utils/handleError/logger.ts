import winston from 'winston';

const options = {
    console: {
        level: 'debug',
        handleExceptions: true,
        json: true,
        colorize: true
    }
};

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format(info => {
            info.level = info.level.toUpperCase();
            return info;
        })(),
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf((info) => {
            const { timestamp, level, message, ...args } = info;

            const ts = timestamp.slice(0, 19).replace('T', ' ');
            return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
        }),
    ),
    transports: [
        new winston.transports.Console(options.console)
    ],
    exitOnError: false
});

export default logger;
