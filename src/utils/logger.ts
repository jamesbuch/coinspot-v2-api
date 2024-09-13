// src/utils/logger.ts

import winston from 'winston';
import { format } from 'winston';
import fs from 'node:fs';
import path from 'node:path';

// Get the project root directory
const projectRoot = process.cwd();

// Ensure the logs directory exists in the project root
const logDir = path.join(projectRoot, 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'coinspot-api-v2' },
    transports: [
        new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(logDir, 'combined.log') })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    }));
}

export function logApiCall(functionName: string, params: any, result: any) {
    logger.info(`API Call: ${functionName}`, {
        params: JSON.stringify(params, null, 2),
        result: JSON.stringify(result, null, 2)
    });
}

export default logger;
