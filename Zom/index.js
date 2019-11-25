const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const api = require('./api')
const graphqlHTTP = require('express-graphql');
const {
    buildSchema
} = require('graphql');


const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    getRestaurant: [Restaurant]
  }
  type Restaurant{
    id: Int
    name: String
    rating: Float
    cuisine: String
    Address: String
  }
`);


// The root provides a resolver function for each API endpoint
var root = {
    getRestaurant: () => {
        return api;
    },
};


// app.use('/', api)
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));


app.listen(3000, (req, res) => {
    console.log("server started at http://localhost:3000")
})