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
    db.select('email', 'note', 'review', 'id').from('reviewbook').where({bookid})
    .then(data => res.json(data))
    .catch(err => console.log(err))
}

const delReview = (req, res, db, jwt) =>{
    const {authorization} = req.headers;
    const {reviewid, email} = req.body
    jwt.verify(authorization, 'JWT_SECRET', (err, authData)=>{ //need to send the token
        if(err){
            res.status(403).send('oopsie')
        }
        else{
            db.select('*').from('users')
            .where('id', '=', authData.id) //look for the id equal at the token payload 
            .then(resp => {
                if(resp[0].email ===  email){// resp email and compare with the email send by the user
                    db('reviewbook').where({email, id:reviewid}).del() // if it s true then its possible to del
                    .returning('*')
                    .then(data =>{  
                        console.log('data', data[0].id)
                       res.json(data[0].id)
                    })
                    .catch(err => console.log('fail: ', err))
                }
                else{
                    res.status(400).json('wrong')
                }
            })
            .catch(err => console.log('oops', err))
        }
    }) 

}

module.exports = {addReview, getReview, delReview}