import { z } from 'zod';
import { injectable } from 'inversify';
import "reflect-metadata";

const envSchema = z.object({
  PORT: z.string().default('3000').transform((val) => parseInt(val, 10)),
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  POKEMON_API_URL: z.string().url().default('https://pokeapi.co/api/v2/pokemon'),
});

export type EnvConfig = z.infer<typeof envSchema>;

@injectable()
export class ConfigService {
    public readonly env: EnvConfig;

    constructor() {
        const parsed = envSchema.safeParse(Bun.env);
        if (!parsed.success) {
            console.error('Invalid environment variables:', parsed.error.format());
            process.exit(1);
        }
        this.env = parsed.data;
    }

    get<K extends keyof EnvConfig>(key: K): EnvConfig[K] {
        return this.env[key];
    }
}
