const addBookToRead = (req, res, db) => {
    const {email, bookID, title, authors, description} = req.body
    console.log(email, bookID)
    db.select('*').from('booktoread').where({email, bookid:bookID})
    .then(data => {
        console.log(data)
        data.length?
        res.status(400).json('already in the booklist')
        :
        db.select('bookid').from('booktoread').where({email})
        .then(data =>  
            {
                data.length >=10?
                res.status(400).json('too much book')
                :
                db.insert({email, bookid:bookID, title, authors, description})
                .into('booktoread')
                .then( data => {
                    db.select('bookid', 'title', 'authors', 'description').from('booktoread').where({email})
                    .then(data => {
                        console.log(data)
                        res.json(data)} )
                })  //You just change that, that mean you need to change the frontend for works
                .catch(err => res.json('err'))
            })
    })
    .catch(err => console.log('err: ', err)) 
};

const getBookToRead = (req, res, db) => {
    const {email} = req.body;
    db.select('bookid', 'title', 'authors', 'description').from('booktoread').where({email})
    .then(data => {
        res.json(data)
        console.log(data)})
    .catch(err => console.log(err))
}

const delBookToRead = (req, res, db) => {
    const {email, bookid} = req.body;
    db('booktoread').where({email, bookid}).del()
    .then(data => res.json('success_del'))
    .catch(err => console.log('fail: ', err))
}

const addBookReading = (req, res, db) => {
    const {email, bookID, title, authors, description} = req.body
    console.log(email, bookID)
    db.select('*').from('bookreading').where({email, bookid:bookID})
    .then(data => {
        console.log(data)
        data.length?
        res.status(400).json('already in the booklist')
        :
        db.select('bookid').from('bookreading').where({email})
        .then(data =>  
            {
                data.length >=10?
                res.status(400).json('too much book')
                :
                db.insert({email, bookid:bookID, title, authors, description})
                .into('bookreading')
                .then( data => {
                    db.select('bookid', 'title', 'authors', 'description').from('bookreading').where({email})
                    .then(data => {
                        const booktoread = data
                        db('booktoread').where({email, bookid:bookID}).del()
                            .then(del => res.json(booktoread))
                        })
                })
                .catch(err => res.json('err'))
            })
    })
    .catch(err => console.log('err: ', err)) 
};

const getBookReading = (req, res, db) => {
    const {email} = req.body;
    db.select('bookid', 'title', 'authors', 'description').from('bookreading').where({email})
    .then(data => {
        res.json(data)
        console.log(data)})
    .catch(err => console.log(err))
}

const delBookReading = (req, res, db) => {
    const {email, bookid} = req.body;
    db('bookreading').where({email, bookid}).del()
    .then(data => res.json('success_del'))
    .catch(err => console.log('fail: ', err))
}

module.exports = { addBookToRead, getBookToRead, delBookToRead, addBookReading, getBookReading, delBookReading };