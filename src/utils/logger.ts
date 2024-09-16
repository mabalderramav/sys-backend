const winston = require('winston');
const expressWinston = require('express-winston');

export const logger = () => {
  return expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    meta: false,
    msg: '{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms  PARAMS:{{JSON.stringify(req.params)}} BODY:{{JSON.stringify(req.body)}}}',
    expressFormat: false,
    colorize: true,
  });
};
