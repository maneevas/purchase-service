function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function ensureAdmin(req, res, next) {
    if (req.user.is_admin) {
        return next();
    }
    res.redirect('/not-authorized');
}

module.exports = {
    ensureAuthenticated,
    ensureAdmin
};
