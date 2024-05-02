
const getSubjects = (req, res) => {

    res.render('subjects', { subjects: req.subjects });
}

const getAddSubject = (req, res) => {
    res.render('add-subject');
}

const postAddSubject = (req, res) => {
    const { subjectName } = req.body;

    req.mainSubjects.addSubject(subjectName);
    req.subjects = req.mainSubjects.subjects;
    res.redirect('/subjects');
}

const deleteSubject = (req, res) => {

    req.mainSubjects.deleteSubject(req.body.name);
    req.subjects = req.mainSubjects.subjects;
    res.sendStatus(200);
}



module.exports = {
    getSubjects,
    getAddSubject,
    postAddSubject,
    deleteSubject
}



