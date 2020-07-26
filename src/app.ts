import express from 'express';
import mongoose from 'mongoose';
import { graphqlHTTP } from 'express-graphql';
import graphqlSchema from './graphql/schema';
import graphqlResolver from './graphql/resolvers';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);

mongoose
  .connect('mongodb://localhost:27017/react-gql-mongo')
  .then(() => {
    app.listen(5000);
    console.log('server started with mongodb');
  })
  .catch((err) => console.log(err));
