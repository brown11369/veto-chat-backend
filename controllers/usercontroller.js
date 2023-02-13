const user = require("../model/userModel");
const recentChat = require("../model/recentChatModel");

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, photoURL } = req.body
        const userData = await user.findOne({ email })
        if (userData) {
            res.send({ status: true, emailExist: true, userData })
        }
        else {
            const userData = await user.create({ username, email, photoURL });
            const recentChatuserData = await recentChat.create({ userID: userData._id });
            if (recentChatuserData) {
                res.send({ status: true, emailExist: false, userData });
            }
            else {
                await user.deleteOne({_id:userData._id})
                res.send({ status: false});
            }
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
        const [recentuser] = await recentChat.find({ userID }).populate("users")
        res.send(recentuser.users);
    }
    catch (error) {
        next(error)
    }
};