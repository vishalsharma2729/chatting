
const express = require("express")
const http = require("http")

const path = require("path")
const app = express();

const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server)

app.set('view engine','hbs');


//socket
io.on("connection",(socket)=>{
    // console.log("socket connection start",socket.id);
    socket.on("message",(message,data)=>{
        socket.broadcast.emit("message",message,data)
    })
});

app.use(express.static(path.resolve("public")));

///Api
app.get("/chat",(req,res)=>{
    user = req.query.name;
res.render("index",{
    user
})
})

app.get("/",(req,res)=>{
    res.render("start")
    })


const port = process.env.port || 8080
server.listen(port,()=>{
    console.log(`server start on ${port}`);
})