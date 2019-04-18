const addReview = (req, res, db) =>{
    const {bookid, userid, note, review, booktitle} = req.body
    console.log(bookid,userid,note, review)
    db.select('name').from('users').where({id:userid})
    .then(
        data=>{
            const name = data[0].name
            db.insert({userid, bookid, note, review, name, booktitle}).into('reviewbook')
            .returning('*')
            .then(data => {
                res.json(data[0])
            })
            .catch(err => console.log(err))
        }
    )
}

const getReview = (req, res, db) => {
    const {bookid} = req.body
    console.log('bokid', bookid)
    db.select('userid', 'note', 'review', 'id', 'name').from('reviewbook').where({bookid})
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
                    db('reviewbook').where({userid:authData.id, id:reviewid}).del() // if it s true then its possible to del
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