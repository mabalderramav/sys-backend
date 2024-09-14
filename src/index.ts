import express, { Request, Response } from 'express';
import routes from './routes/index';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/v1', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
