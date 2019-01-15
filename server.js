const express = require('express');
const graphqlHttp = require('express-graphql')
const app = express();
const schema = require('./schema')
const cors = require('cors');

app.use(cors());

app.use('/graphql', graphqlHttp({
    graphiql: true,
    schema
}));

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API Running on ${PORT}`));