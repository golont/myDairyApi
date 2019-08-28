const moment = require("moment");

exports.getRemainTime = (req, res) => {
    const now = moment();
    // const now = moment("2019-08-28T23:51:54.999");
    const endOfDay = moment().endOf("day");
    const duration = moment.duration(endOfDay.diff(now));
    const remain = duration.hours() + ":" + duration.minutes() + ":" + duration.seconds();
    res.send({ time: remain });
};
