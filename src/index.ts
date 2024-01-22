import init    from "./utils/initialSetup";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const db = init();
app.get("/", (req, res) => { 
    res.send("Server running");
})

app.post("/api/add",  (req, res) => { 
    const { name, salary, date, position } = req.body;
    if(!name || !salary || !date || !position) return res.status(400).json({ message: "Please fill all the fields", isSuccess: false });
    const id = crypto.randomUUID();
    db.query(`INSERT INTO employees (id,name, salary, join_date, position) VALUES ('${id}','${name}', ${salary}, '${date}', '${position}')`, (err, result) => { 
        if (err) return res.status(500).json({ message: "Something went wrong", isSuccess: false, err });
        res.status(200).json({ message: "Employee added",isSuccess: true });
    });
})

app.get("/get", (req, res) => {
   db.query("SELECT * FROM employees", (err, result) => { 
       if (err) return res.status(500).json({ message: "Something went wrong", isSuccess: false,err });
        res.status(200).json({ data: result, isSuccess: true });
    });
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥 🔥 `));


