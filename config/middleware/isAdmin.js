module.exports = function (req, res, next) {
    if (req.user && !req.user.isAdmin) {
        res.redirect("/home");
    }

    if (req.user && req.user.isAdmin) {
        return next();
    }


    return res.redirect("/");
}