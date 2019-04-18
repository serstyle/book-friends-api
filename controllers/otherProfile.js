const getProfile = (req, res, db) => {
    const {id} = req.body
    db('users').select('name').where({id})
    .then(resp => res.json(resp[0]))

}

const getReviews = (req, res, db) => {
    const {id} = req.body
    db.select('booktitle', 'note', 'review', 'bookid', 'id').from('reviewbook').where({userid:id})
    .then(reviews => res.json(reviews))
}

const getToReadBookList = (req, res, db) => {
    const {id} = req.body
    db('users').select('email').where({id})
    .then(
        email=>{
            db.select('bookid', 'title', 'authors', 'description').from('booktoread').where({email:email[0].email})
            .then(data => {
            res.json(data)
            console.log(data)})
        .catch(err => console.log(err))
        }
    )
}
const getReadingBookList = (req, res, db) => {
    const {id} = req.body
    db('users').select('email').where({id})
    .then(
        email=>{
            db.select('bookid', 'title', 'authors', 'description').from('bookreading').where({email:email[0].email})
            .then(data => {
            res.json(data)
            console.log(data)})
        .catch(err => console.log(err))
        }
    )
}
const getFinishBookList = (req, res, db) => {
    const {id} = req.body
    db('users').select('email').where({id})
    .then(
        email=>{
            db.select('bookid', 'title', 'authors', 'description').from('bookfinish').where({email:email[0].email})
            .then(data => {
            res.json(data)
            console.log(data)})
        .catch(err => console.log(err))
        }
    )
}


module.exports = {getProfile, getReviews, getToReadBookList, getReadingBookList, getFinishBookList}