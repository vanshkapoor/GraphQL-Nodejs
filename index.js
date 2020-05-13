const express = require("express");

// Allows express to understand graphQL
const expressGraphQL = require("express-graphql");

const schema = require("./schema");

const app = express();

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
