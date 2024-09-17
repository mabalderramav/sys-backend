import express from 'express';
import { logger } from './utils/logger';
import routes from './routes/index';

const app = express();
const PORT = process.env.PORT || 5000;

var cors = require('cors');
app.use(cors());
app.use(express.json());

app.use(logger());

app.use('/v1', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
