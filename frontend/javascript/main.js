import highlightLogic from "./highlight.js";
import {ws, sendDocument, doc_data} from "./webSocketHandler.js";

const editor = document.getElementById('editor');

let savedRange = null;

document.addEventListener("DOMContentLoaded", function () {
  ws.onopen = () => {
    console.log("Connected to web socket!");
    ws.send(JSON.stringify({ TYPE: "Command", CMD: "get_id" }));
  };
});

// Save selection on mouseup or keyup in the editor
editor.addEventListener("mouseup", saveSelection);
editor.addEventListener("keyup", saveSelection);

editor.addEventListener("input",()=>{
  doc_data.doc_content = editor.innerHTML;
  sendDocument();
})

function saveSelection() {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    savedRange = selection.getRangeAt(0);
  }
}

// Handle the submit button click
document.getElementById("submitDocIdButton").addEventListener("click", function() {
  const docId = document.getElementById("docIdInput").value;

  // Check if the input is a valid number
  if (docId) {
    // Send the document ID to the WebSocket server
    const message = {
      TYPE: "Command",
      CMD: "get_doc_by_id",
      BODY: {
        oldID: doc_data.doc_id,
        newID: parseInt(docId),
       } // Convert to number
    };
    ws.send(JSON.stringify(message));

    // Optionally, clear the input field after submission
    document.getElementById("docIdInput").value = '';
  } else {
    alert("Please enter a valid document ID.");
  }
});

document
  .getElementById("highlightButton")
  .addEventListener("click", function () {
    highlightLogic(savedRange);
  });
