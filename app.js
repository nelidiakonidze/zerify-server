const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');

const {
  create: studentsCreate,
  list: studentsList,
  getStudentById: studentsGetStudentsById,
  deleteStudentById: studentsDeleteStudentsById,
} = require('./server/controllers/students');

const {
  create: coursesCreate,
  list: coursesList,
  getCoursesById: coursesGetCoursesById,
  deleteCourseById: coursesDeleteCourseById,
} = require('./server/controllers/courses');

const hostname = '127.0.0.1';
const port = 3000;
const app = express(); // setup express application
const server = http.createServer(app);

app.use(logger('dev')); // log requests to the console

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Students Routes
app.post('/api/students', studentsCreate);
app.get('/api/students', studentsList);
app.get('/api/students/:id', studentsGetStudentsById);
app.delete('/api/students/:id', studentsDeleteStudentsById);

//Courses Routes
app.post('/api/courses', coursesCreate);
app.get('/api/courses', coursesList);
app.get('/api/courses/:id', coursesGetCoursesById);
app.delete('/api/courses/:id', coursesDeleteCourseById);

app.get('*', (req, res) =>
  res.status(200).send({
    message: 'Welcome to the default API route',
  }),
);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
