const express = require("express");

// Allows express to understand graphQL
const expressGraphQL = require("express-graphql");

const schema = require("./schema");

const app = express();

const mongoose = require("mongoose");
const database = require("./keys");
// connection
mongoose.connect(database.mongoURI, { useNewUrlParser: true }, err => {
  if (err) {
    console.log("error has occured in DB");
  } else {
    console.log("DB connected");
  }
});

// expressgraphql middleware knows how to understand the graphql request
app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
);

app.listen(3000, () => {
  console.log("server is running");
});
