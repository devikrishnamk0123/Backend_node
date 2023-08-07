"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import winston from 'winston';
var winston = require("winston");
var logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './src/logger/error.log', level: 'error' }),
        new winston.transports.File({ filename: './src/logger/combined.log' }),
    ]
});
// Log operation information
//logger.info('Operation successful', { operation: 'myOperation', status: 'success' });
//logger.error('Operation failed', { operation: 'myOperation', status: 'failure', error: 'An error occurred' });
