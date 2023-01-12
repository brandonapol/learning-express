module.exports = async (req, res) => {
    res.render('submissions', { user: req.verifiedUser.user });
}