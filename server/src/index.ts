import { PokemonApi } from "./pokemon.api";
import { Resolvers } from "./generated/graphql";

const { ApolloServer, gql } = require('apollo-server');


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Pokemon {
    name: String
    url: String
  }

  type PokemonDetail {
    id: String
    name: String
    order: Int
    weight: Int
    height: Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    pokemons: [Pokemon]
    pokemon: PokemonDetail
  }
`;

const dataSources = () => ({
  pokemonAPI: new PokemonApi()
})


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers: Resolvers = {
  Query: {
    pokemons: async (_, __, { dataSources }) => {
      return dataSources.pokemonAPI.list()
    },
    pokemon: async (_, {idOrName}: any, { dataSources }) => {
      return dataSources.pokemonAPI.find(idOrName)
    },
  },
};

// The ApolloServer constructor requires two parameters: your schemas
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers, dataSources });

// The `listen` method launches a web server.
server.listen().then((res: any) => {
  console.log(`🚀  Server ready at ${res.url}`);
});
