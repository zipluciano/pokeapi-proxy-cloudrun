import { injectable, inject } from 'inversify';
import pino from 'pino';
import { TYPES } from '../ioc/types';
import type { ConfigService } from '../config/config.service';
import "reflect-metadata";

@injectable()
export class LoggerService {
    private logger: pino.Logger;

    constructor(@inject(TYPES.ConfigService) configService: ConfigService) {
        this.logger = pino({
            level: configService.get('LOG_LEVEL'),
            transport: configService.get('NODE_ENV') === 'development' ? {
                target: 'pino-pretty',
                options: {
                    colorize: true
                }
            } : undefined
        });
    }

    info(msg: string, ...args: any[]) {
        this.logger.info(msg, ...args);
    }

    error(msg: string, ...args: any[]) {
        this.logger.error(msg, ...args);
    }
    
    debug(msg: string, ...args: any[]) {
        this.logger.debug(msg, ...args);
    }

    warn(msg: string, ...args: any[]) {
        this.logger.warn(msg, ...args);
    }
}
