import * as bunyan from 'bunyan';
import {root} from '../global';
import {Stream} from "bunyan";

const {APP_ENV} = process.env;

const streams: Stream[] = [{
    level: 'error',
    path: root + '/logs/serviceErrors.log'
}];

if (APP_ENV !== 'test') {
    streams.push({
        level: 'info',
        stream: process.stdout
    })
}

const serviceErrorsLogger = bunyan.createLogger({
    name: 'serviceErrorsLogger',
    streams
});

const loggers = {
    serviceErrorsLogger
};


export default loggers;
