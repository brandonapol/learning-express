const axios = require('axios')

module.exports = async (req, res) => {
    const slug = req.params.slug
    
    let answers = []
    let submissionId = ''

    for (const answer in req.body) {
        if (answer !== 'title' && answer !== 'quizId') {
            answers.push({
                questionId: answer,
                answer: String(req.body[answer])
            })
        }
    }

    const mutation = `
        mutation submitQuiz($userId: String!, $quizId: String!, $answers: [AnswerInput!]!) { 
            submitQuiz( userId: $userId, quizId: $quizId, answers: $answers )
        }`

    try {
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT, 
            { 
                query: mutation,
                variables: {
                    quizId: req.body.quizId,
                    userId: req.verifiedUser.user._id,
                    answers
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            });   
        console.log(data)
        console.log({
            quizId: req.body.quizId,
            userId: req.verifiedUser.user._id,
            answers
        })
        submissionId = data.data.submitQuiz
    } catch(e) {
        console.log(e)
    }   

    res.redirect(`/quiz/results/${submissionId}`)
}