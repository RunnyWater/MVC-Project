const getHomepage = (req, res) => {
    console.log(req.subjects);
    res.render('home', { subjects: req.subjects });
}

module.exports = {
    getHomepage
}