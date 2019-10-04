const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const {graphiqlExpress, graphqlExpress} = require('apollo-server-express');
const {makeExecutableSchema} = require('graphql-tools');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const Rating = require('./models/Rating');
const User = require('./models/User');
const {typeDefs} = require('./schema');
const {resolvers} = require('./resolvers');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

dotenv.config({ path: './.env' });
console.log(`Your TMDb_API_KEY222 is ${process.env.MDB}`); // 8626

mongoose.connect(process.env.MDB)
.then(() => console.log('Mongoose connected'))
.catch((err) => console.error(`Error: ${err}`));

const PORT = process.env.PORT || 4001;
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions));

app.use(async (req, res, next) => {
    const token = req.headers['authorization'];
    if (token != "null") {
        try {
            const currentUser = await jwt.verify(token, process.env.SECRET);
            req.currentUser = currentUser;
        } catch(err) {
            console.log("Error:", err);
            
        }
    }
    console.log('token - ', token);
    next();
});

app.use('/graphiql', graphiqlExpress({endpointURL: 'graphql'}))
// destructuring req and adding currentUser to context
app.use('/graphql', 
    bodyParser.json(),
    graphqlExpress( ({currentUser}) => ({
        schema,
        context: {
            Rating,
            User,
            currentUser
        }
    }))
);

app.listen(PORT, () => {
    console.log('listening on ' + PORT);
    
})