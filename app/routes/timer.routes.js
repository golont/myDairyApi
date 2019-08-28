module.exports = app => {
    const timer = require("../controllers/timer.controller.js");
    app.get("/time/", timer.getRemainTime);
};
