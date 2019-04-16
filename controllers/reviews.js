const addReview = (req, res, db) =>{
    const {bookid, email, note, review} = req.body
    console.log(bookid,email,note, review)
    db.insert({email, bookid, note, review}).into('reviewbook')
    .returning('*')
    .then(data => {
        res.json(data[0])
    })
    .catch(err => console.log(err))
}

const getReview = (req, res, db) => {
    const {bookid} = req.body
    console.log('bokid', bookid)
    db.select('email', 'note', 'review').from('reviewbook').where({bookid})
    .then(data => res.json(data))
    .catch(err => console.log(err))
}

module.exports = {addReview, getReview}