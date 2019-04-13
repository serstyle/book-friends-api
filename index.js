const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');
const jwt = require('jsonwebtoken')

//route
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const auth = require('./controllers/authorization');
const signout = require('./controllers/signout');
const handleBook = require('./controllers/handleBook');
const profile = require('./controllers/profile');

const app = express()

const db = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: true,
  });

//   client: 'pg',
//   connection: {
//     connectionString: process.env.POSTGRES_URI
//   }
// });

app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.send('start');
})

app.post('/signin', (req, res) => { signin.signinAuthentication(req, res, db, bcrypt)});
app.post('/register', (req, res) => { register.registerAuthentication(req, res, db, bcrypt)});
app.post('/signout', auth.requireAuth, (req, res) => { signout.handleSignout(req, res)});

app.post('/addbook', auth.requireAuth, (req, res) => { handleBook.addBookToRead(req, res, db)});
app.post('/getbook', auth.requireAuth, (req, res) => { handleBook.getBookToRead(req, res, db)});
app.post('/delbook', auth.requireAuth, (req, res) => { handleBook.delBookToRead(req, res, db)});

app.post('/profile', auth.requireAuth, (req, res) => {profile.getProfile(req, res, db, jwt)});
app.put('/updateprofile', auth.requireAuth, (req, res) => {profile.updateProfile(req, res, db)});

// function verifyToken(req, res, next){
//     const barearHeader = req.headers['authorization'];
//     if(barearHeader){
//         const barear = barearHeader.split(' ');
//         const barearToken = barear[1];
//         req.token = barearToken;
//         next();
//     }
//     else{
//         res.status(403).send('not good')
//     }
// }

app.listen(3000 || process.env.PORT, ()=>{
    console.log('server on 3000');
});