import "reflect-metadata";
import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { container } from './ioc/container';
import { TYPES } from './ioc/types';
import type { ConfigService } from './config/config.service';
import type { LoggerService } from './services/logger.service';
import { v1Routes } from './routes/v1';

const config = container.get<ConfigService>(TYPES.ConfigService);
const port = config.get('PORT');
const logger = container.get<LoggerService>(TYPES.LoggerService);

const app = new Elysia()
    .use(swagger())
    .use(v1Routes)
    .listen(port);

logger.info(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
logger.info(`Swagger available at http://${app.server?.hostname}:${app.server?.port}/swagger`);
