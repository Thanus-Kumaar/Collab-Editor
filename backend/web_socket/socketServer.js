const ws = require("ws");

const createWebSocketServer = (server) => {
  const wsServer = new ws.Server({ server });

  wsServer.on("connection", (wsObject, req) => {
    console.log("Got request from client", wsObject);
    wsObject.on("message", (message) => {
      console.log("Recieved message: ", message);
    });
    wsObject.on("close", () => {
      console.log("Client disconnected!");
    });
    wsObject.on("error", (err) => {
      console.log("Error occured: ", err);
    });
  });
  return wsServer;
};

module.exports = createWebSocketServer;