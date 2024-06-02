import { ConsoleLogger, LogLevel } from '@nestjs/common';

export class Logger {
  private static logger: ConsoleLogger;

  static log(message: any, logLevel: LogLevel = 'log'): void {
    if (!Logger.logger) {
      Logger.logger = new ConsoleLogger();
    }

    Logger.logger[logLevel](`\n${message}`);
  }
}
