```js
// api/contacts.js
import express from "express";
import cors from "cors";

// Create an Express app
const app = express();
app.use(cors());
app.use(express.json());

// Example contacts store (in-memory for now)
let contacts = [];

// POST /api/contacts → Add new contact
app.post("/api/contacts", (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newContact = { id: Date.now(), name, email, phone };
  contacts.push(newContact);

  res.status(201).json(newContact);
});

// GET /api/contacts → List all contacts
app.get("/api/contacts", (req, res) => {
  res.json(contacts);
});

// Export handler for Vercel
export default app;
```