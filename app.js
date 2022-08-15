const express = require('express');


require('dotenv').config();

//STUDENT ROUTERS
const studentAuthRouter = require('./routes/student/auth');
const studentHomeworkRouter = require('./routes/student/homework');
//STUDENT ROUTERS

//TEACHER ROUTERS
const teacherAuthRouter = require('./routes/teacher/auth');
const teacherAssignmentRouter = require('./routes/teacher/assign');
//TEACHER ROUTERS

let PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

//STUDENT ROUTE
app.use('/api/student/auth', studentAuthRouter);
app.use('/api/student/homework', studentHomeworkRouter);
//STUDENT ROUTE

//TEACHER ROUTE
app.use('/api/teacher/auth', teacherAuthRouter);
app.use('/api/teacher/assign', teacherAssignmentRouter);
//TEACHER ROUTE

app.listen(PORT, () => {
    console.log(`App started at ${PORT} port.`);
});