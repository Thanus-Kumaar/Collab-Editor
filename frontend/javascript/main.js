import highlightLogic from "./highlight.js";

let savedRange = null;

// Save selection on mouseup or keyup in the editor
document.getElementById("editor").addEventListener("mouseup", saveSelection);
document.getElementById("editor").addEventListener("keyup", saveSelection);

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
