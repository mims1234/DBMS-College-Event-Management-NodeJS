const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");

const session = require("express-session");
const bcrypt = require("bcrypt-nodejs");
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const databaseSet = 'uem'

const {getAuthCheck,getLoginPage,getFailLogin,getLogoutCheck,getRegAuthCheck,getFailReg} = require('./routes/login');
const {getAdminEventPage} = require('./routes/AdminEvent');
const {getAdminViewPage,getLogPage,getParticipantPage} = require('./routes/AdminView');
const {getAdminEditPage,getAdminAddPage,getAdminEditCheck,getAdminAddCheck,getAdminDeleteCheck} = require('./routes/AdminAdd_Edit');
const {getEventPage} = require('./routes/Event');
const {getViewPage,getJoinCheck} = require('./routes/View');


//DB Credentials
const db = mysql.createConnection({
        host: 'localhost',
        user: `${process.env.DB_USER}`,
        password: `${process.env.DB_PASS}`,
        database: `${databaseSet}`,
        port: `${process.env.DB_PORT}`
})

app.use(session({
    secret  :'secret',
    resave  :true,
    saveUninitialized   :true
}))

//DB connection
db.connect((err) => {
    if(err) throw err;
    console.log(`Connected to *${databaseSet}* Database`)
})
global.db = db; 
//global.ses = session();

//Configuring Middleware
app.set('port',port);
app.set('views',__dirname + "/views");
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname+'/public')));

//Routes - LOGIN
app.all('/login', getLoginPage);
app.get('/loginFail', getFailLogin);
app.post('/reg', getRegAuthCheck);
app.get('/regFail', getFailReg);
app.post('/auth', getAuthCheck);

//Routes - Events
app.post('/logout', getLogoutCheck);
app.all('/adminevents', getAdminEventPage);
app.all('/events', getEventPage);
app.post('/participants', getParticipantPage);

//Routes - View
app.all('/adminview', getAdminViewPage);
app.all('/view', getViewPage);
app.all('/checklogs', getLogPage);

//Routes - Edits
app.all('/adminedit', getAdminEditPage);
app.all('/adminadd', getAdminAddPage);
app.post('/authdelete',getAdminDeleteCheck);
app.post('/authedit',getAdminEditCheck);
app.post('/authadd',getAdminAddCheck);
app.post('/authjoin',getJoinCheck);

// app.all('/adminedit', function(req,res) {
//     res.render('Aedit.ejs',{
//         title: 'Student Login',
//         loginMSG:'',
//         regMSG:''
//     })
// });

//Listening Port
app.listen(port , () => {
    console.log(`Listening to Port ${port}`);
})

