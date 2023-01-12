const QuizDashboardRouter = require("express").Router()

QuizDashboardRouter.route("/create")
    .get(require("./editor.js"))
    .post(require("./create.js"))

QuizDashboardRouter.route("/success/:slug")
    .get(require("./created.js"))

QuizDashboardRouter.route("/:slug")
    .get(require("./view.js"))

QuizDashboardRouter.route("/:slug/submit")
    .post(require("./submit.js"))

QuizDashboardRouter.route("/results/:id")
    .get(require("./results.js"))

module.exports = QuizDashboardRouter