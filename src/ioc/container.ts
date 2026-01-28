import { Container } from 'inversify';
import { TYPES } from './types';
import { ConfigService } from '../config/config.service';
import { LoggerService } from '../services/logger.service';
import { PokemonService } from '../services/pokemon.service';
import { PokemonController } from '../controllers/pokemon.controller';

const container = new Container();

container.bind<ConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
container.bind<LoggerService>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
container.bind<PokemonService>(TYPES.PokemonService).to(PokemonService).inSingletonScope();
container.bind<PokemonController>(TYPES.PokemonController).to(PokemonController).inSingletonScope();

export { container };
