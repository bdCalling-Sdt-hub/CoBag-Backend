// src/server/server.ts
import express, { Application } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { socketHelper } from './app/helper/socket';


const server: http.Server = http.createServer(app);
const PORT = config.port || 3000;

// Middleware
app.use(express.json());





async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
     //socket
     const io = new Server(server, {
      pingTimeout: 60000,
    });
    socketHelper.socket(io);
    // @ts-ignore
    global.io = io;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();

process.on('unhandledRejection', (reason) => {
  console.error(`Unhandled Rejection: ${reason}`);
  if (server) {
    server.close(() => process.exit(1));
  }
});

process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});
