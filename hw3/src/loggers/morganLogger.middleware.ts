import * as morgan from 'morgan';


morgan.token('params', (req, res) => {
    const {params} = req;
    let paramsStr = ' Params =';
    Object.keys(params).forEach(key => {
        paramsStr += ` ${key}: ${params[key]}; `
    });
    return paramsStr;
});

const morganLogger = morgan((tokens, req, res) => {
        return [
            tokens.method(req, res), '-',
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.params(req, res),
            tokens['response-time'](req, res), 'ms'
        ].join(' ')
});

export default morganLogger;
