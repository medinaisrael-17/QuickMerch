module.exports = function (req, res, next) {
    if (req.user && req.user.isAdmin) {
        return next();
    }

    if (req.user && !req.user.isAdmin) {
        res.redirect("/home");
    }

    return res.redirect("/");
}