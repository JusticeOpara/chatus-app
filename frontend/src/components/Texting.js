const app = require("app");
const appServer = require("http").createServer(express);
const cors  = require("cors");

const io = require("socket.io")(appServer,{
    cors : {
         origin:"*",
        methods: [ "GET" , "POST" ]
    }
})
app.use(cors())


const PORT = process.env.PORT || 5000;

app.get("/", (req,res) => {
    res.send("Server is running.");
})

 io.on("connection", (socket)=>{
    socket.emit('me',socket.id)

    socket.on('disconnect',()=>{
        socket.broadcast.emit("callended")
    })

    
    socket.on("calluser",({ userToCall,signalData,from, name })=>{
      io.to(userToCall).emit("calluser", { signal:signalData,from,name })
    })

    socket.on("answercall",(data) => {
        io.to(data.to).emit("callAccepted",data.signal)
    })


 })

appServer.listen(PORT, () => console.log(`Server listening on port ${PORT}`))


// optimizeDeps: {
//     include: ['esm-dep > cjs-dep'],
//   },
