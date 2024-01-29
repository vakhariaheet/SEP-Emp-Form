const init = require("./utils/initialSetup");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const {uid } = require("uid");
const { query } = require("./utils/utils");
const { formatDate } = require("./utils/date");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set('views', './src/views');

dotenv.config();

const db = init();

app.post("/api/add", async (req, res) => { 
    const { name, salary, date, position } = req.body;
    if (!name || !salary || !date || !position) {
        app.locals.message = "Please provide all the details";
        app.locals.isSuccess = false;
        return res.redirect("/");
    }
    if (isNaN(salary) || salary < 10000) {
        app.locals.message = "Please provide valid salary";
        app.locals.isSuccess = false;
        return res.redirect("/");
    }
    if (name.match(/^[a-zA-Z ]*$/) === null) { 
        app.locals.message = "Please provide valid name";
        app.locals.isSuccess = false;
        return res.redirect("/");
    }
    try {
        
        const id = uid();
        await query(db, `INSERT INTO EmpInfo (id,name, salary, join_date, position) VALUES ('${id}','${name}', ${salary}, '${date}', '${position}')`);
        app.locals.message = "Employee added successfully";
        app.locals.isSuccess = true;
        return res.redirect("/");
    }catch (err) {
        app.locals.message = "Something went wrong";
        app.locals.isSuccess = false;
        return res.redirect("/");
    }

})

app.get("/", (req, res) => {
    res.render('index',{ message: app.locals.message, isSuccess: app.locals.isSuccess,title:"Emp Form"});
    app.locals.message = "";
    
});
app.get('/employees', async (req, res) => {

    try {
        const employees = await query(db, `SELECT * FROM EmpInfo`);
        res.render('emp',{title:"All Employees",employees,formatDate})
    }catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥 🔥 `));