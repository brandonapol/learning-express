// Import required info from graphql
const { GraphQLSchema, GraphQLObjectType } = require("graphql")
const mutations = require('./mutations')

// Import queries
const queries = require('./queries')

// Define QueryType
const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "Queries",
    fields: queries
})

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Mutations",
    fields: mutations
})

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})