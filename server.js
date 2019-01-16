const express = require('express');
const graphqlHttp = require('express-graphql')
const app = express();
const schema = require('./schema')
const cors = require('cors');
const path = require('path');

app.use(cors());

app.use('/graphql', graphqlHttp({
    graphiql: true,
    schema
}));

app.use(express.static(path.join(__dirname, './build')));

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build', 'index.html'))
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API Running on ${PORT}`));