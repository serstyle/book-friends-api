const addFollow = (req, res, db) => {
    const {user_id, follow_by_id} = req.body;
    db.insert({user_id, follow_by_id}).into('follow')
    .then(resp => {
        db('follow').select('user_id').where({follow_by_id})
        .then(data => {
        const array = data.map(follow => follow.user_id)
        db.raw('select * from users where id in (' + array.map(_ => '?').join(',') + ')', [...array])
        .then(resp=>res.json(resp.rows))
        })
    })
}

const getFollow = (req, res, db) => {
    const {follow_by_id} = req.body;
    db('follow').select('user_id').where({follow_by_id})
    .then(data => {
    const array = data.map(follow => follow.user_id)
    db.raw('select * from users where id in (' + array.map(_ => '?').join(',') + ')', [...array])
    .then(resp=>res.json(resp.rows))
    })
}

const getFollower = (req, res, db) => {
    const {user_id} = req.body;
    db('follow').select('follow_by_id').where({user_id})
    .then(data => {
    const array = data.map(follower => follower.follow_by_id)
    db.raw('select * from users where id in (' + array.map(_ => '?').join(',') + ')', [...array]) //select mutliple user with there id
    .then(resp=>res.json(resp.rows))
    }) 
}

const unFollow = (req, res, db) => {
    const {user_id, follow_by_id} = req.body;
    db('follow').where({user_id, follow_by_id}).del()
    .then(resp => {
        db('follow').select('user_id').where({follow_by_id})
        .then(data => {
        const array = data.map(follow => follow.user_id)
        db.raw('select * from users where id in (' + array.map(_ => '?').join(',') + ')', [...array])
        .then(resp=>res.json(resp.rows))
        })
    })
}




module.exports = {addFollow, getFollow, getFollower, unFollow}