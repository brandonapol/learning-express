const axios = require('axios')
const { GraphQLID } = require('graphql')

const userData = async (req, res, next) => {
    if (!req.verifiedUser) {
        next()
        return
    }

    const query = `
        query user($id: ID!) { 
            user( id: $id ) {
                id,
                quizzes {
                    id,
                    slug,
                    title,
                    description,
                    questions {
                        title,
                        order,
                        correctAnswer
                    },
                    submissions {
                        score,
                        userId
                    },
                    avgScore
                },
                submissions {
                    id,
                    userId,
                    quizId,
                    quiz {
                        title,
                        description
                    },
                    score
                }
            } 
        }`
    console.log(req.verifiedUser.user._id)
    let data = {}
    try {
        data = await axios.post(process.env.GRAPHQL_ENDPOINT, 
        { 
            query,
            variables: {
                // this is where we pass the id in to the query, basically
                id: req.verifiedUser.user._id
            }
        },
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }); 
    } catch(e) {
        console.log(e)
    }
    // "Always gotta be coalescing." -- Lucas Lang
    req.verifiedUser.user.quizzes = data.data.data.user?.quizzes ?? []
    req.verifiedUser.user.submissions = data.data.data.user?.submissions ?? []

    next()
}

module.exports = { userData }