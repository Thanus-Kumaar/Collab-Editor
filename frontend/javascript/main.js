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

document
  .getElementById("highlightButton")
  .addEventListener("click", function () {
    highlightLogic(savedRange);
  });
