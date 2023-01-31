require("dotenv").config();
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const socket = require("socket.io")

const userRoutes=require("./routes/userRoutes")
const messagesRoutes=require("./routes/messagesRoute")


const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/auth",userRoutes)
app.use("/api/messsages",messagesRoutes)

mongoose.connect(process.env.MONGO_ONLINE_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log("you are connected with database")
})
.catch((error)=>{
    throw error
})

const server=app.listen(process.env.PORT, () => {
    console.log(`Server up and running ${process.env.PORT}`)
})



const io=socket(server,{
    cors: {
        origin: process.env.SOCKET_FRONTEND_URI,
        Credentials:true,
        methods: ["GET", "POST"],
    }
});
global.onlineUsers=new Map();

io.on("connection",(socket)=>{
    global.chatSocket=socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });

    socket.on("send-msg",(data)=>{
        const sendUserSocket=onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.message);
        }
    })
})
