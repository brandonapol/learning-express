const MainAuthRouter = require("express").Router()

MainAuthRouter.route("/login")
    .get(require("./login.view.js"))
    .post(require(("./login.js")))

MainAuthRouter.route("/register")
    .get(require("./register.view.js"))
    .post(require(("./register.js")))

MainAuthRouter.route("/logout")
    .get(require(("./logout.js")))

module.exports = MainAuthRouter