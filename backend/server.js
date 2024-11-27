const express = require("express");
const cors = require("cors");

const createWebSocketServer = require("./web_socket/socketServer.js");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  return res.status(200).json({ MSG: "server is running" });
});

app.get("/documents",(req, res)=>{
  return res.status(200).json(Object.fromEntries(documents));
})

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});

let documents = new Map()

const socketServer = createWebSocketServer(server, documents);
