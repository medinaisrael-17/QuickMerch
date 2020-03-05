const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json({
            email: req.user.email,
            id: req.user.id
        });
    });

    app.post("/api/signup", function (req, res) {
        db.User.create({
            email: req.body.email,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password
        })
            .then(function () {
                res.redirect(307, "/api/login")
            })
            .catch(function (err) {
                res.status(401).json(err)
            });
    });

    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    })

    app.get("/api/user_data", function (req, res) {
        if (!req.user) {
            res.json({});
        }
        else {
            res.json({
                email: req.user.email,
                name: req.user.name,
                phoneNumber: req.user.phoneNumber,
                id: req.user.id
            });
        }
    });

    app.get("/api/user_routes", function (req, res) {
        if (!req.user) {
            return res.json({})
        }

        console.log(req.body);

        db.User.findOne({
            where: {
                id: req.body.id
            },
            // include: { model: db.Route, attributes: { exclude: ["password"] } },
            include: [db.Route],
            attributes: {
                exclude: ["password"]
            }
        }).then(function (dbUserRoutes) {
            res.json(dbUserRoutes);
        })
    })
};