const messageModel = require("../model/messageModel");
const recentChatModel = require("../model/recentChatModel");

module.exports.addMessages = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;

        const recentChatfun = async (chatlist,from,to) => {
            let checkUser = chatlist.users.find((item) => {
                return item.toString() === to
            })
            if (checkUser == undefined) {
                await recentChatModel.updateOne({ userID: from }, { $push: { users: to } })
            }
        }

        const fromuserchatlist = await recentChatModel.findOne({ userID: from })
        const touserchatlist = await recentChatModel.findOne({ userID: to })

        recentChatfun(fromuserchatlist,from,to)
        recentChatfun(touserchatlist,to,from)



        const data = await messageModel.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        })

        if (data) return res.send({ message: "Message added" });
        return res.send({ message: "failed to add message" })
    } catch (error) {
        next(error)
    }
}


module.exports.getMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await messageModel.find(
            {
                users: {
                    $all: [from, to],
                },
            }
        ).sort({ updatedAt: 1 });
        const projectMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        return res.send(projectMessages)
    } catch (error) {
        next(error)
    }
}



