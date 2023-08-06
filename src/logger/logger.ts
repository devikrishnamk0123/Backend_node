//import winston from 'winston';
import winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  //format: winston.format.json(),
  transports: [
    //new winston.transports.Console(),
    new winston.transports.File({ filename: './src/logger/error.log', level: 'error' }),
    new winston.transports.File({ filename: './src/logger/combined.log' }),
  ],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    }))
});

export default logger;


// Log operation information
// logger.info('Operation successful', { operation: 'myOperation', status: 'success' });
// logger.error('Operation failed', { operation: 'myOperation', status: 'failure', error: 'An error occurred' });
