import * as bunyan from 'bunyan';
import {root} from '../global';

const log = bunyan.createLogger({
  name: 'unhandledErrorsLogger',
  streams: [
    {
      level: 'info',
      stream: process.stdout
    },
    {
      level: 'error',
      path: root + '/logs/unhandledErrors.log'
    }
  ]
});

const unhandledErrorsLogger = (err, req, res, next) => {
  if (err) {
    log.info(err);
    log.error(err);
    res.status(500).send('Internal Server Error');
  }
  next();
};

export default unhandledErrorsLogger;
