import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import type { Request, Response } from 'express';

import routes from './routes';
import { handleError } from './controllers/error.controller';

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/auth', routes.authRouter);
app.use(routes.devicesRouter);
app.use(routes.baseRouter);

app.use(handleError);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('test', (msg) => {
    console.log(msg);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});