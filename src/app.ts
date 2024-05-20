import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

const abcd = 0;

//application routes
// app.use('/api/products');
// app.use('/api/orders');

//default
app.get('/', (req: Request, res: Response) => {
  res.send('Hello Prithibi!');
});

export default app;
