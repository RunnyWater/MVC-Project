const getDashboard = (req, res) => {
    res.render('dashboard', { subjects: req.subjects });
}


const addMark = (req, res) => {
    req.mainSubjects.addMark(req.body.name, req.body.mark);
    req.subjects = req.mainSubjects.subjects;
    res.sendStatus(200);

}

const deleteMark = (req, res) => {
    req.mainSubjects.deleteMark(req.body.name, req.body.id);
    req.subjects = req.mainSubjects.subjects;
    res.sendStatus(200);

}


module.exports = {
    getDashboard,
    addMark, 
    deleteMark
}