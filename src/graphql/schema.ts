import { buildSchema } from 'graphql';

export default buildSchema(`

type Item {
  _id: ID!
  data: String!
}

input ItemData {
  data: String!
}


type RootQuery {
  getAllItems: [Item!]!
}


type RootMutation {
  addItem(item: ItemData): Item!
  editItem(id: ID!, item: ItemData): Item!
  deleteItem(id: ID!): Boolean!
}

schema {
  query: RootQuery
  mutation: RootMutation
  }
`);
