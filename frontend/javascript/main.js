import highlightLogic from "./highlight.js";

const editor = document.getElementById('editor');

let savedRange = null;
let doc_data = {
  doc_id: null,
  doc_content: "",
};

document.addEventListener("DOMContentLoaded", function () {
  const ws = new WebSocket("ws://localhost:8080");
  ws.onopen = () => {
    console.log("Connected to web socket!");
    ws.send(JSON.stringify({ TYPE: "Command", CMD: "get_id" }));
  };

  ws.onmessage = (message) => {
    console.log("Got message", message.data);
    const data = JSON.parse(message.data);
    switch (data.TYPE){
      case "Command":
        switch(data.CMD){
          case "set_id":
            doc_data.doc_id = parseInt(data.BODY);
            doc_data.doc_content = editor.innerHTML;
            console.log(doc_data);
        }
    }
  };
});

// Save selection on mouseup or keyup in the editor
editor.addEventListener("mouseup", saveSelection);
editor.addEventListener("keyup", saveSelection);

function saveSelection() {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    savedRange = selection.getRangeAt(0);
  }
}

document
  .getElementById("highlightButton")
  .addEventListener("click", function () {
    highlightLogic(savedRange);
  });
