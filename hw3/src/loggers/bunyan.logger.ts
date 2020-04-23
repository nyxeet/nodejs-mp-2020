import * as bunyan from 'bunyan';
import {root} from '../global';

const serviceErrorsLogger = bunyan.createLogger({
    name: 'serviceErrorsLogger',
    streams: [
        {
            level: 'info',
            stream: process.stdout
        },
        {
            level: 'error',
            path: root + '/logs/serviceErrors.log'
        }
    ]
});

const loggers = {
    serviceErrorsLogger
};


export default loggers;
