const path = require("path");

const isAuth = require("../config/middleware/isAuth");

module.exports = function (app) {
    app.get("/", function (req, res) {
        if (req.user) {
            res.redirect("/home")
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    app.get("/login", function (req, res) {
        if (req.user) {
            res.redirect("/home");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    app.get("/home", isAuth, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"))
    })
}