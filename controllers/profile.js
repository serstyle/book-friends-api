const getProfile = (req, res, db, jwt) => {
    // use redis verify the token and also jwt.verify  
    //If there is token, id so ok 
    const {authorization} = req.headers;
    jwt.verify(authorization, 'JWT_SECRET', (err, authData)=>{
        if(err){
            res.status(403).send('oopsie')
        }
        else{
            console.log(authData)
            db.select('*').from('users')
            .where('id', '=', authData.id)
            .then(resp => res.json(resp[0]))
            .catch(err => console.log(err))
        }
    }) 
}

const updateProfile = (req, res, db) => { //should use transaction knex
    const {email, name, age, city} = req.body;
    db('users')
    .where({email})
    .update({name, age, city})
    .returning('*')
    .then(data =>{
        const user = data;
        console.log('update :', data[0])
        db('reviewbook')
        .where({userid:data[0].id})
        .update({name})
        .then(data =>res.json(user[0]))
        // db.select('*').from('users').where({email})
        // .then(resp => {
        //     res.json(resp[0])
        //     console.log(resp[0])
        // })
    })
    .catch(err => console.log(err))
}
module.exports = { getProfile, updateProfile }