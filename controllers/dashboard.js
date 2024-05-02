const getDashboard = (req, res) => {
    res.render('dashboard', { subjects: req.subjects });
}


const addMark = (req, res) => {
    req.mainSubjects.addMark(req.body.name, req.body.mark);
    req.subjects = req.mainSubjects.subjects;
    res.sendStatus(200);
    // res.sendStatus(200);

}

const deleteMark = (req, res) => {
    // console.log(req.body);
    req.mainSubjects.deleteMark(req.body.name, req.body.id);
    req.subjects = req.mainSubjects.subjects;
    // res.redirect('/dashboard');
    res.sendStatus(200);

}


module.exports = {
    getDashboard,
    addMark, 
    deleteMark
}