// src/server/server.ts
import express, { Application } from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { socketHelper } from './app/helper/socket';
import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import fs from 'fs';
import schedule from 'node-schedule';
import logger from './logger';
const server: http.Server = http.createServer(app);
const PORT = config.port || 3000;

// Middleware
app.use(express.json());

// Get the directory of the logs and archive
const LOGS_DIR = path.join(process.cwd(), 'logs');
const ARCHIVE_DIR = path.join(process.cwd(), 'archive');

// Ensure the archive folder exists
if (!fs.existsSync(ARCHIVE_DIR)) {
  fs.mkdirSync(ARCHIVE_DIR);
}

// Schedule to run daily at midnight
schedule.scheduleJob('0 0 * * *', () => {
  try {
    const files = fs.readdirSync(LOGS_DIR);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 30);

    files.forEach((file) => {
      const filePath = path.join(LOGS_DIR, file);
      const stats = fs.statSync(filePath);

      if (stats.mtime < cutoffDate) {
        // Move file to archive
        const archivePath = path.join(ARCHIVE_DIR, file);
        fs.renameSync(filePath, archivePath);
        logger.info(`Archived log file: ${file}`);
      }
    });
  } catch (err) {
    logger.error(`Error during log archiving: ${(err as Error).message}`);
  }
});


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
