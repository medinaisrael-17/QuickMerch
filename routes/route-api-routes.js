const db = require("../models");

module.exports = function (app) {

    app.get("/api/allroutes", function(req, res) {
        db.Route.findAll({
            inlcude: [db.User],
            order: [['store', "ASC"]]
        }).then(function(data) {
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
        console.log(req.params.routeId)
        db.Route.destroy({
            where: {
                id: req.params.routeId
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

    //unassign a route
    app.put("/api/unassign", function(req, res) {
        db.Route.update({
            completed: false,
            isAssigned: false,
            UserId: null
        },
        {
            where: {
                id: req.body.id
            }
        }).then(function(data) {
            res.json(data);
        })
    })

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
