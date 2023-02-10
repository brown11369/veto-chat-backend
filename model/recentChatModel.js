const mongoose = require("mongoose");

const recentchatSchema = mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
            unique:true,
        }]
    }, { timestamps: true, });

module.exports = mongoose.model("recentchats", recentchatSchema);