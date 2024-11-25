import React, { useRef, useState, useEffect } from "react";

const TextEditor = () => {
  const editorRef = useRef(null);
  const [content, setContent] = useState("<p>Start editing here...</p>");

  // Initialize content only once when component mounts
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  }, []);

  const handleInput = (e) => {
    const editor = editorRef.current;
    if (editor) {
      setContent(editor.innerHTML);  // Still update the state for tracking
    }
  };

  // Manage selection and cursor
  const getSelectionDetails = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      console.log("Selection details:", range.toString());
    }
  };

  return (
    <div className="h-full">
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onClick={getSelectionDetails}
        className="h-full rounded-lg border-2 p-4 border-blue-300 outline-blue-500"
      />
    </div>
  );
};

export default TextEditor;
