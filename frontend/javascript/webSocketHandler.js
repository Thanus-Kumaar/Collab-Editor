let doc_data = {
  doc_id: null,
  doc_content: "",
};

const editor = document.getElementById("editor");

// websocket for connecting with the backend
const ws = new WebSocket("ws://localhost:8080");

ws.onmessage = (message) => {
  console.log("Got message", message.data);
  const data = JSON.parse(message.data);
  switch (data.TYPE) {
    case "Command":
      switch (data.CMD) {
        case "set_id":
          doc_data.doc_id = parseInt(data.BODY);
          doc_data.doc_content = editor.innerHTML;
          console.log(doc_data);
          break;
      }
      break;
    case "Data":
      editor.innerHTML = data.BODY;
      break;
  }
};

function sendDocument() {
  ws.send(
    JSON.stringify({
      TYPE: "Data",
      BODY: doc_data,
    })
  );
  console.log("Sending document data")
}

export { ws, sendDocument, doc_data };
