module.exports = app => {
    const users = require("../controllers/user.controller.js");
    app.get("/get-user/", users.getUser);
    app.put("/upd-last-post/", users.updateLastPost);
    app.post("/create-user/", users.createUser);
    app.post("/create-new-post/", users.createNewPost);
};
