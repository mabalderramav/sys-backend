import express from 'express';
const winston = require('winston');
const expressWinston = require('express-winston');
import routes from './routes/index';

const app = express();
const PORT = 3000;

var cors = require('cors');
app.use(cors());
app.use(express.json());

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    meta: false,
    msg: '{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms  PARAMS:{{JSON.stringify(req.params)}} BODY:{{JSON.stringify(req.body)}}}',
    expressFormat: false,
    colorize: true,
  })
);

app.use('/v1', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
