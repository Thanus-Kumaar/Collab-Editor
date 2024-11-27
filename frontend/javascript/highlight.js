// Highlight button logic
export default function highlightLogic (savedRange) {
  // Restore saved range
  if (savedRange) {
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(savedRange);

    // Highlight selected text
    const range = selection.getRangeAt(0);
    console.log(savedRange);
    const parentElement = range.startContainer.parentNode;
    if (
      parentElement.nodeName == "SPAN" &&
      parentElement.style.backgroundColor === "yellow"
    ) {
      const text = parentElement.textContent;
      parentElement.remove();
      const newNode = document.createTextNode(text);
      range.deleteContents();
      range.insertNode(newNode);
    } else {
      // Add highlight
      const span = document.createElement("span");
      span.style.backgroundColor = "yellow"; // Change this color as needed
      range.surroundContents(span);
    }
    // Clear saved selection
    savedRange = null;
    selection.removeAllRanges();
  }
}
