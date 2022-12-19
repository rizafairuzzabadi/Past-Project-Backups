const hs = require("http-status");
const { listOne, listAll, create } = require("../services/Users")
const { passwordToHash } = require("../scripts/utils/helper")


const registerUser = (req, res) => {
    //! hashing password
    req.body.password = passwordToHash(req.body.password);
    //! if user does not choose a role default set visitor
    if(!req.body.role){req.body.role = "visitor"}
    create(req.body)
    .then((createdUser) => {
        if(!createdUser) return res.status(hs.INTERNAL_SERVER_ERROR).send({error: "User can not registered.."});

        res.status(hs.OK).send(createdUser);
    })
    .catch((e) => {
        res.status(hs.INTERNAL_SERVER_ERROR).send(e);
    })
}

const loginUser = (req, res) => {
    req.body.password = passwordToHash(req.body.password)
    listOne(req.body)
    .then((user) => {
      if (!user) return res.status(hs.NOT_FOUND).send({ message: "There is no user created with this email address." });
      
      res.status(hs.OK).send(user);
    })
    .catch((e) => res.status(hs.INTERNAL_SERVER_ERROR).send(e));

}

const listAllUsers = () => {
    
}

const listOneUser = () => {
    
}

module.exports = {
    registerUser,
    loginUser,
    listAllUsers,
    listOneUser
}