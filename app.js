const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const Subjects = require('./models/Subjects');

app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public'))); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));



let mainSubjects = new Subjects(process.env.DATASET_NAME, process.env.CONNECTION_STRING);
const fetchSubjects = async (req, res, next) => {
    try {
        req.mainSubjects = mainSubjects;
        req.subjects = mainSubjects.subjects;
        next();
    } catch (error) {
        console.error("Error fetching subjects:", error);
        res.status(500).send("An error occurred while fetching subjects.");
    }
}; 
app.use(fetchSubjects);

app.listen(3000, () => {
    console.log(`Server running on port http://localhost:3000`);
});

const dashboardRoutes = require('./routes/dashboard');
const subjectsRoutes = require('./routes/subjects');
const homeRoutes = require('./routes/home');

app.use('/dashboard', dashboardRoutes);
app.use('/subjects', subjectsRoutes);
app.use('/', homeRoutes);


const errorRoutes = require('./routes/error');
app.use("*", errorRoutes);