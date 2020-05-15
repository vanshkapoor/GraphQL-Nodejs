// @FILE NOTE : This file is the schema for the graphQL
const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// making dummy data

// const books = require("./booksdata");
// const author = require("./authordata");
const Book = require("./models/books");
const Author = require("./models/author");

//TASK1 :  DEFINING THE SCHEMA
const BookType = new GraphQLObjectType({
  name: "Book", //name for the schema object
  fields: () => ({
    //This is a function because it helps the mutuple types that will be created in future to  interaxt with each other
    id: { type: GraphQLID }, //The complete shcema is made of types that are understandable by the graphQL
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        let id = parent.authorId;
        return Author.findById(id);
        // return _.find(author, { id: parent.authorid });
      }
    }
  })
});
const AuthorType = new GraphQLObjectType({
  name: "Author", //name for the schema object
  fields: () => ({
    //This is a function because it helps the mutuple types that will be created in future to  interaxt with each other
    id: { type: GraphQLID }, //The complete shcema is made of types that are understandable by the graphQL
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    book: {
      type: new GraphQLList(BookType), //since an author has multpiple books
      resolve(parent, args) {
        return Book.find({ authorId: parent.id });
        // return _.filter(books, { authorid: parent.id }); //returns the array from list
      }
    }
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
        return Book.findById(args.id);
        // return _.find(books, { id: args.id });
        // code to get data from db / other resources
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
        // return _.find(author, { id: args.id });
      }
    },
    books: {
      //for all books
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
        // return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
        // return author;
      }
    }
  }
});

const Mutations = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLID }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
});
