import { Elysia } from 'elysia';
import { pokemonRoutes } from './pokemon.routes';

export const v1Routes = new Elysia({ prefix: '/v1' })
    .use(pokemonRoutes);
