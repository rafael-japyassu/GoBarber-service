import 'reflect-metadata';
import express, { NextFunction, Response, Request } from 'express';
import 'express-async-errors';

import { resolve } from 'path';
import AppError from './errors/AppError';
import routes from './routes';
import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(resolve(__dirname, '..', 'tmp')));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statuesCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});
