const MainDashboardRouter = require("express").Router()

MainDashboardRouter.route("/")
    .get(require("./dashboard.view.js"))

MainDashboardRouter.route("/submissions")
    .get(require("./submissions.view.js"))

module.exports = MainDashboardRouter