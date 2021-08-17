var Userdb = require('../model/model');

// create & save new user
exports.create = (req, res) => {
    // Validation request
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty"});
        return;
    }

    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    // save user in database
    user.save(user)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating a create operation"
            })
        })
}

// retrieve and return all users / retrieve and return a single user
exports.find = (req, res) => {
    
    if(req.query.id){   // Find Single Data
        const id = req.query.id;
        Userdb.findById(id)
            .then(data => {
                if(!data){
                    res.status(404).send({
                        message: `User Not Found With Id: ${id}`
                    })
                }else{
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || `Error retriving user with id ${id}`
                })
            })
    }else{              // Find Multi Data
        Userdb.find()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error Occurred while retriving user information"
                })
            })
    }
}

// update a new identified user by user id
exports.update = (req, res) => {
    if(!req.body){
        return res
                .status(400)
                .send({message: "Data to update cannot be empty!"});
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({message: `Cannot Update Data With id ${id}. Maybe User Not Found!`});
            }else{
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error Update user information!"});
        })
}

// Delete a user with specified user id in
exports.delete = (req, res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: `Cannot Delete Data With ${id}. Maybe User Not Found!`});
            }else{
                res.send({
                    message: `User Delete Successfully!`
                });
            };
        })
        .catch(err => {
            res.status(500).send({
                message: `Couldn't Delete User with ID = ${id}!`
            })
        })
}