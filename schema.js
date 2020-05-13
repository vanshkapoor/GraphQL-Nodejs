// @FILE NOTE : This file is the schema for the graphQL
const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

// making dummy data
var books = [
  { name: "book1", genre: "adv", id: "1" },
  { name: "book2", genre: "fictional", id: "2" },
  { name: "book3", genre: "sci fi", id: "3" }
];

//TASK1 :  DEFINING THE SCHEMA
const BookType = new GraphQLObjectType({
  name: "Book", //name for the schema object
  fields: () => ({
    //This is a function because it helps the mutuple types that will be created in future to  interaxt with each other
    id: { type: GraphQLID }, //The complete shcema is made of types that are understandable by the graphQL
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

//TASK2 :  DEFINING THE QUERIES ON THE SCHEMA JUST MADE
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //THE style you define this field, is the way how you will get the data
    book: {
      type: BookType, //name of the schema
      args: { id: { type: GraphQLID } }, //graphQLID is flexible i.e, works on both id and strign
      resolve(parent, args) {
        return _.find(books, { id: args.id });
        // code to get data from db / other resources
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
