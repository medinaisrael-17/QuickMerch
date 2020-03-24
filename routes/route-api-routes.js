const db = require("../models");

module.exports = function (app) {

    app.get("/api/allroutes", function(req, res) {
        db.Route.findAll({}).then(function(data) {
            res.json(data);
        })
    })


    //create the routes
    app.post("/api/routes", function (req, res) {
        db.Route.create(req.body).then(function (dbRoute) {
            res.json(dbRoute);
        });
    });

    //delete the routes
    app.delete("/api/routes/:routeId", function (req, res) {
        db.Route.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbRoute) {
            res.json(dbRoute);
        });
    });

    //update who the route is assigned to 
    app.put("/api/routes/", function (req, res) {
        console.log(req.body.id);
        db.Route.update(
            {
                isAssigned: true,
                UserId: req.body.user_id
            },
            { where: { id: req.body.id } }
        )
            .then(function (dbRoute) {
                res.json(dbRoute);
            });
    });

    //update the routes completion 
    app.put("/api/routes/:routeId", function (req, res) {
        console.log(req.body)
        db.Route.update({
            completed: req.body.status
        },
            {
                where: {
                    id: req.params.routeId
                }
            })
            .then(function (dbRoute) {
                res.json({ dbRoute });
            });
    });
}
