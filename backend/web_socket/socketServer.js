const ws = require("ws");

const createWebSocketServer = (server, documents) => {
  const wsServer = new ws.Server({ server });

  wsServer.on("connection", (wsObject, req) => {
    console.log("Got request from client");
    wsObject.on("message", (message) => {
      const data = JSON.parse(message);
      const type = data.TYPE;
      switch (type) {
        case "Command":
          const cmd = data.CMD;
          switch (cmd) {
            case "get_id":
              console.log("Request for new ID...sending data.");
              wsObject.send(
                JSON.stringify({ TYPE: "Command", CMD: "set_id", BODY: "1" })
              );
          }
          break;
        case "Data":
          const {doc_id, doc_content} = data.BODY;
          documents.set(doc_id, doc_content);
      }
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
