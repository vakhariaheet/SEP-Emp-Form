import init    from "./utils/initialSetup";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const db = init();

app.post("/api/add", async (req, res) => { 
    const { name, salary, date, position } = req.body;
    if(!name || !salary || !date || !position) return res.status(400).json({ message: "Please fill all the fields", isSuccess: false });
    const id = crypto.randomUUID();
    await db.query(`INSERT INTO employees (id,name, salary, join_date, position) VALUES ('${id}','${name}', ${salary}, '${date}', '${position}')`);
    res.status(200).json({ message: "Employee added",isSuccess: true });
})


const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥 🔥 `));


