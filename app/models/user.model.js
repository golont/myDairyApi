const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        name: String,
        posts: [
            {
                id: String,
                title: String,
                text: String,
                date: String
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", UserSchema);
