import morgan from 'morgan';
import json from 'morgan-json';

import logger from './logger';


const format = json({
    method: ':method',
    url: ':url',
    status: ':status',
    contentLength: ':res[content-length]',
    responseTime: ':response-time'
});

const httpLogger = morgan(format, {
    stream: {
        write: (message) => {
            const { status } = JSON.parse(message);

            if (status >= 400) {
                logger.error('HTTP error', setOption(JSON.parse(message)));
            } else {
                logger.info('HTTP Access Log', setOption(JSON.parse(message)));
            }
        }
    }
});

function setOption(message: any) {
    const { method, url, status, contentLength, responseTime } = message;

    return {
        timestamp: new Date().toString(),
        method,
        url,
        status: Number(status),
        contentLength,
        responseTime: Number(responseTime)
    };
}

export default httpLogger;
