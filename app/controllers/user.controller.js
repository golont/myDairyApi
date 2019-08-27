const User = require("../models/user.model.js");
const moment = require("moment");

exports.getUser = (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    const { username } = req.params;
    User.find({ name: username })
        .then(data => {
            if (data.length < 1) res.send({ isUserFound: false });
            else res.send({ isUserFound: true });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Note."
            });
        });
};

exports.getUserPosts = (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    const { username } = req.params;
    User.find({ name: username })
        .then(data => {
            if (data.length < 1) res.send({ isUserFound: false });
            else
                res.send({
                    posts: data[0].posts,
                    currentDate: moment().format("DD.MM.YYYY")
                });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Note."
            });
        });
};

exports.getCurrentTime = (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.send({
        currentDate: moment().format("DD.MM.YYYY")
    });
};

exports.updateLastPost = (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    const { username } = req.body;
    const { id, title, text } = req.body.post;
    User.updateOne(
        { name: username, "posts._id": id },
        { $set: { "posts.$.title": title, "posts.$.text": text } },
        () => {
            console.log("done");
            res.send({ message: "POST updated" });
        }
    );
};

exports.createUser = (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    const { username } = req.body;
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
    const { username } = req.body;
    const newPost = {
        title: "",
        text: "",
        date: moment().format("DD.MM.YYYY")
    };
    User.updateOne({ name: username }, { $push: { posts: newPost } }, () => {
        console.log("done");
        res.send({ message: "New Post Added" });
    });
};
