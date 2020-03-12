const path = require("path");

const isAuth = require("../config/middleware/isAuth");

const isAdmin = require("../config/middleware/isAdmin");

module.exports = function (app) {
    app.get("/", function (req, res) {
        if (req.user && req.user.isAdmin) {
            return res.redirect("/admin/home");
        }
        else if (req.user) {
            return res.redirect("/home");
        } else {
            return res.sendFile(path.join(__dirname, "../public/signup.html"))
        }

    });


    app.get("/login", function (req, res) {
        if (req.user) {
            res.redirect("/home");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    app.get("/admin/home", isAdmin, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/adminHome.html"));
    })

    app.get("/home", isAuth, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    })


    app.get("/routes", isAuth, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/routes.html"));
    })

    app.get("/profile", isAuth, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/profile.html"));
    })
}