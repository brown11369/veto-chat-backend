const user = require("../model/userModel");
const recentChat = require("../model/recentChatModel");

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, photoURL } = req.body
        const emailCheck = await user.findOne({ email })
        if (emailCheck) {
            res.send({ status: true, emailCheck })
        } else {
            const userData = await user.create({ username, email, photoURL });
            await recentChat.create({ userID: userData._id });
            res.send({ status: true, userData });
        }
    }
    catch (error) {
        next(error)
    }
};

module.exports.getallusers = async (req, res, next) => {
    try {
        const userID = req.params.id;
        const users = await user.find({ _id: { $ne: userID } }).select([
            "email",
            "username",
            "photoURL",
            "_id"
        ]);
        return res.send(users);
    }
    catch (error) {
        next(error)
    }
};

module.exports.recentchatusers = async (req, res, next) => {
    try {
        const userID = req.params.id;
        const user = await recentChat.find({ userID }).populate("users")
        return res.send(user);
    }
    catch (error) {
        next(error)
    }
};