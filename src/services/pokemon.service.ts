import { injectable, inject } from 'inversify';
import { TYPES } from '../ioc/types';
import type { ConfigService } from '../config/config.service';
import type { LoggerService } from './logger.service';
import "reflect-metadata";

@injectable()
export class PokemonService {
    private readonly apiUrl: string;

    constructor(
        @inject(TYPES.ConfigService) private config: ConfigService,
        @inject(TYPES.LoggerService) private logger: LoggerService
    ) {
        this.apiUrl = this.config.get('POKEMON_API_URL');
    }

    public async getPokemons(limit: number = 20, offset: number = 0) {
        this.logger.debug(`Fetching pokemons with limit=${limit} and offset=${offset}`);
        
        try {
            const url = new URL(this.apiUrl);
            url.searchParams.append('limit', limit.toString());
            url.searchParams.append('offset', offset.toString());

            const response = await fetch(url.toString());
            
            if (!response.ok) {
                this.logger.error(`Failed to fetch pokemons: ${response.statusText}`);
                throw new Error(`Failed to fetch pokemons: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            this.logger.error('Error fetching pokemons', error);
            throw error;
        }
    }
}
