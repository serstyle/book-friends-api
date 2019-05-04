const getUsers = (req, res, db) => {
    db('users').select('name', 'id')
    .then(resp => res.json(resp))
}

module.exports = {getUsers}