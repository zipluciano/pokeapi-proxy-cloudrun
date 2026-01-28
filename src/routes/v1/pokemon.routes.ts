import { Elysia } from 'elysia';
import { container } from '../../ioc/container';
import { TYPES } from '../../ioc/types';
import type { PokemonController } from '../../controllers/pokemon.controller';

export const pokemonRoutes = new Elysia({ prefix: '/pokemons' })
    .get('/', ({ query }) => {
        const controller = container.get<PokemonController>(TYPES.PokemonController);
        return controller.list(query);
    });
