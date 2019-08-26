const User = require("../models/user.model.js");

exports.getUser = (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    const { username } = req.params;
    User.find({ name: username })
        .then(data => {
            if (data.length < 1) res.send({ isUserFound: false });
            else res.send({ data, isUserFound: true });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Note."
            });
        });
};

exports.updateLastPost = (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
};

exports.createUser = (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    const { username, now } = req.body;
    if (!username) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    const user = new User({
        name: username,
        posts: []
    });

    user.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Note."
            });
        });
};

exports.createNewPost = (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
};
