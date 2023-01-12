const express = require('express')
const dotenv = require('dotenv')
const { connectDB } = require('./src/db')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./src/graphql/schema')
const cookieParser = require('cookie-parser')
const { authenticate } = require('./src/middleware/auth')
const { userData } = require('./src/middleware/userData')

dotenv.config()

const app = express();
// custom func to connect to MongoDB
connectDB();
// parse cookies
app.use(cookieParser())

// instantiate graphql and schema that we made
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))
// encodes forms ( this is "middleware" )
app.use(express.urlencoded({ extended: true }))

// uses authentication middleware
app.use(authenticate)
app.use(userData)

// setup EJS for views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/templates/views'));


/* Initialize Routes */
require("./src/routes")(app)

app.listen(process.env.PORT, () => {
    console.log(`Process has started on port ${process.env.PORT}`)
})