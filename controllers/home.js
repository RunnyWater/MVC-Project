const getHomepage = (req, res) => {
    res.render('home', { subjects: req.subjects });
}

module.exports = {
    getHomepage
}