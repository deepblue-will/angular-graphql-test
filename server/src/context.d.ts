import type {PokemonApi} from './pokemon.api'

export type Context = {
  dataSources: {
    pokemonAPI: PokemonApi
  }
}