const User = require("../models/User");

const listAll = () => {
    return User.find({});
}

const listOne = (where) => {
    return User.findOne(where);
}

const create = (data) => {
    return new User(data).save();
}

module.exports = {
    listOne,
    listAll,
    create
}

