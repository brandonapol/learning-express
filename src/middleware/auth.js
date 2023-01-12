const jwt = require("jsonwebtoken")
const unprotectedRoutes = [
        "/auth/login",
        "/auth/register",
        "/graphql"
]

const authenticate = async (req, res, next) => {
    const token = req.cookies?.jwtToken || ""

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.verifiedUser = verified
        console.log("User verification successful!", verified)
        next()
        // the next() function allows us to use something else here - 
        // this becomes a wrapper for that function, which will finish up next
    } catch(err) {
        console.log("User verification failed")

        if ( unprotectedRoutes.includes(req.path) ) {
            next()
            // same as before just different ending of the tree
        } else {
            res.redirect(`/auth/login`)
        }
    }
}

module.exports = { authenticate }