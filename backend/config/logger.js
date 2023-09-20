const winston = require("winston");
// winston.emitErrs = true;
// const fs = require("fs");

// const logDir = "logs"; // directory path you want to set
// if (!fs.existsSync(logDir)) {
//     // Create the directory if it does not exist
//     fs.mkdirSync(logDir);
// }

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: "info",
      filename: "logs/all-logs.log",
      handleExceptions: true,
      json: false,
      maxsize: 10485760, // 10MB
      maxFiles: 20,
      colorize: false,
      timestamp: true,
    }),
    new winston.transports.Console({
      level: "info",
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.timestamp(),
      ),
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
