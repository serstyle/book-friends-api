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
const reviews = require('./controllers/reviews');
const otherProfile = require('./controllers/otherProfile');
const follow = require('./controllers/follow');

const app = express()

const db = knex({
    client: 'pg',
    connection: process.env.POSTGRES_URI
  });

//   client: 'pg',
//   connection: process.env.POSTGRES_URI
//       connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
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

app.post('/addbook', auth.requireAuth,(req, res) => { handleBook.addBookToRead(req, res, db)});
app.post('/getbook', auth.requireAuth,(req, res) => { handleBook.getBookToRead(req, res, db)});
app.post('/delbook', auth.requireAuth,(req, res) => { handleBook.delBookToRead(req, res, db)});

app.post('/addbookreading', auth.requireAuth,(req, res) => { handleBook.addBookReading(req, res, db)});
app.post('/delbookreading', auth.requireAuth,(req, res) => { handleBook.delBookReading(req, res, db)});
app.post('/getbookreading', auth.requireAuth,(req, res) => { handleBook.getBookReading(req, res, db)});

app.post('/addbookfinish', auth.requireAuth,(req, res) => { handleBook.addBookFinish(req, res, db)});
app.post('/getbookfinish', auth.requireAuth,(req, res) => { handleBook.getBookFinish(req, res, db)});
app.post('/delbookfinish', auth.requireAuth,(req, res) => { handleBook.delBookFinish(req, res, db)});

app.post('/profile', auth.requireAuth, (req, res) => {profile.getProfile(req, res, db, jwt)});
app.put('/updateprofile', auth.requireAuth, (req, res) => {profile.updateProfile(req, res, db)});

app.post('/addreview', auth.requireAuth, (req, res) => {reviews.addReview(req, res, db)});
app.post('/getreview', (req, res) => {reviews.getReview(req, res, db)});
app.post('/delreview', auth.requireAuth,(req, res) => {reviews.delReview(req, res, db, jwt)});

app.post('/otherprofile', (req, res) => {otherProfile.getProfile(req, res, db)});
app.post('/otherprofile/reviews', (req, res) => {otherProfile.getReviews(req, res, db)});
app.post('/otherprofile/toreadbooklist', (req, res) => {otherProfile.getToReadBookList(req, res, db)});
app.post('/otherprofile/readingbooklist', (req, res) => {otherProfile.getReadingBookList(req, res, db)}); //dont forget to add auth
app.post('/otherprofile/finishbooklist', (req, res) => {otherProfile.getFinishBookList(req, res, db)});

app.post('/follow/addfollow', (req, res) => {follow.addFollow(req, res, db)});
app.post('/follow/getfollows', (req, res) => {follow.getFollow(req, res, db)});
app.post('/follow/getfollowers', (req, res) => {follow.getFollower(req, res, db)}); //dont forget to add auth
app.post('/follow/unfollow', (req, res) => {follow.unFollow(req, res, db)});


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

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`server on ${process.env.PORT}`);
});