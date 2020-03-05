const db = require("../models");

module.exports = function (app) {
    // app.get("/api/routes", function(req, res) {
    //     const query = {};
    //     if (req.query.user_id) {
    //         query.UserId = req.query.user_id
    //     }

    //     db.
    // })

    app.post("/api/routes", function (req, res) {
        db.Route.create(req.body).then(function (dbRoute) {
            res.json(dbRoute);
        });
    });

    app.delete("/api/routes/:routeId", function (req, res) {
        db.Route.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbRoute) {
            res.json(dbRoute);
        });
    });

    app.put("/api/routes/", function (req, res) {
        db.Route.update(
            {isAssigned: true},
            { UserId: req.body.user_id },
            {
                where: {
                    id: req.body.id
                }
            })
            .then(function (dbRoute) {
                res.json(dbRoute);
            });
    });

    app.put("/api/routes/:routeId", function(req, res) {
        db.Route.update({
            completed: true
        },
        {where: {
            id: req.params.routeId
        }})
        .then(function(dbRoute) {
            res.json({dbRoute});
        });
    });
}
