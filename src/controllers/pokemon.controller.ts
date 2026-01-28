import { injectable, inject } from 'inversify';
import { TYPES } from '../ioc/types';
import type { PokemonService } from '../services/pokemon.service';
import type { LoggerService } from '../services/logger.service';

@injectable()
export class PokemonController {
    constructor(
        @inject(TYPES.PokemonService) private pokemonService: PokemonService,
        @inject(TYPES.LoggerService) private logger: LoggerService
    ) {}

    public async list(query: { limit?: string; offset?: string }) {
        this.logger.info("Pokemon list endpoint called");
        
        const limit = query.limit ? parseInt(query.limit, 10) : 20;
        const offset = query.offset ? parseInt(query.offset, 10) : 0;

        return this.pokemonService.getPokemons(limit, offset);
    }
}
