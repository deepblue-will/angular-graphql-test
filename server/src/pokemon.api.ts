const { RESTDataSource } = require('apollo-datasource-rest');

export interface PaginationList<Item> {
  count: number;
  next: string | null;
  previous: string | null;
  results: Item[]
}

export interface PokemonSummary {
  name: string,
  url: string,
}

export interface PokemonDetail {

}

export class PokemonApi extends RESTDataSource {
  constructor() {
    // Always call super()
    super();
    // Sets the base URL for the REST API
    this.baseURL = 'https://pokeapi.co/api/v2/';
  }

  async find(idOrName: string): Promise<PokemonDetail> {
    return this.get(`pokemon/${idOrName}`);
  }

  async list(limit = 20, offset = 0): Promise<PokemonSummary[]> {
    const data = await this.get('pokemon', { limit, offset }) as PaginationList<PokemonSummary>;
    return data.results;
  }
}