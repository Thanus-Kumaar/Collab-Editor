const ws = require("ws");
const Semaphore = require("../utils/semaphore.js");

const semaphore = new Semaphore(1);
let nextID = 0;

const createWebSocketServer = (server, documents) => {
  const wsServer = new ws.Server({ server });

  const documentClients = new Map();

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
                JSON.stringify({ TYPE: "Command", CMD: "set_id", BODY: nextID.toString() })
              );
              if(!documentClients.has(nextID)){
                documentClients.set(nextID, []);
              }
              documentClients.get(nextID).push(wsObject);
              nextID+=1;
              break;
            case "get_doc_by_id":
              documentClients.delete(data.BODY.oldID);
              const doc_content = documents.get(data.BODY.newID);
              wsObject.send(
                JSON.stringify({
                  TYPE: "Command",
                  CMD: "set_doc",
                  BODY: {
                    NEW_ID: data.BODY.newID,
                    CONTENT:doc_content
                  },
                })
              );
              if(!documentClients.has(data.BODY.newID)){
                documentClients.set(data.BODY.newID, []);
              }
              documentClients.get(data.BODY.newID).push(wsObject);
              break;
          }
          break;
        case "Data":
          const { doc_id, doc_content } = data.BODY;
          semaphore.lock();
          documents.set(doc_id, doc_content);
          semaphore.unlock();
          documentClients.get(doc_id).forEach((client) => {
            if (client !== wsObject && client.readyState === ws.OPEN) {
              client.send(
                JSON.stringify({
                  TYPE: "Data",
                  BODY: doc_content,
                })
              );
            }
          });
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
