const getProfile = (req, res, db) => {
    const {id} = req.body
    db('users').select('name').where({id})
    .then(resp => {
        const data = resp[0]
        db('follow').select('user_id').where({follow_by_id:id})
        .then(resp =>{
            const follows = resp
            db('follow').select('follow_by_id').where({user_id:id})
            .then(resp =>{
                const followers = resp
                res.json({data, follows, followers})
            })
        })
    })
    .catch(err => res.json('err'))

}

const getReviews = (req, res, db) => {
    const {id} = req.body
    db.select('booktitle', 'note', 'review', 'bookid', 'id').from('reviewbook').orderBy('id', 'desc').limit(10).where({userid:id})
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