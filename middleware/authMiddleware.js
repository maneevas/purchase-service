function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/login');
}

function ensureAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.is_admin) {
        return next();
    }
    res.redirect('/not-authorized');
}

module.exports = {
    ensureAuthenticated,
    ensureAdmin
};
