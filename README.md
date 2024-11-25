# 📝 **Collaborative Text Editor** 🌐

A real-time collaborative text editor where multiple users can work on the same document simultaneously, built with **React.js**, **Express.js**, and **WebSockets** (`ws` library).

---
## 📚 **About**

This project allows multiple users to edit a document in real-time. Changes are synchronized across all users, and conflict resolution is handled efficiently using **semaphore-based locking** and **delta synchronization**.

## 💡 **How it Works**

1. **WebSockets:** Enables persistent, bidirectional communication between the server and clients for instant updates.
2. **Delta Sync:** Instead of sending the entire document, only the changes (deltas) are transmitted, ensuring efficient updates.
3. **Semaphore-based** Locking: Prevents conflicts by allowing only one user to modify a critical section of the document at a time.
4. **Queue for Conflict** Resolution: Handles concurrent modification requests gracefully, applying them sequentially.
5.**Frontend-Backend** Synchronization: React.js handles the UI, while Express.js and WebSocket manage communication and business logic.

## 🎯 **Project Goals**

This project serves as a learning platform for concepts such as:

- Understanding WebSocket protocols for real-time communication.
- Implementing semaphore-based locking for conflict resolution.
- Exploring delta synchronization for efficient data transfer.
- Applying React.js for a responsive and dynamic frontend.
- Designing robust backend architectures with Express.js.

## 🛠️ **Technologies Used**

| **Technology**      | **Purpose**                                  |
|----------------------|----------------------------------------------|
| **React.js**         | Frontend for the collaborative editor        |
| **Express.js**       | Backend server managing WebSocket communication |
| **ws**              | WebSocket library for real-time updates      |
| **JavaScript (Node.js)** | Core language for backend and frontend       |


## ⚙️ **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/collaborative-text-editor.git
   cd collaborative-text-editor
   ```
2. Install dependencies for backend and frontend:
   ```bash
   npm install
   cd frontend && npm install
   ```
3. Start the backend:
  ```bash
  npm run server
  ```
4. Start the React frontend:
   ```bash
   npm start
   ```
5. Open in your browser at `http://localhost:3000`.


## 🚀 **End**
Collaborate on text documents in real time with a seamless experience, efficient data handling, and conflict-free synchronization!

---

