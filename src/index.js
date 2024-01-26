const init = require("./utils/initialSetup");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const {uid } = require("uid");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set('views', './src/views');

dotenv.config();

const db = init();

app.post("/api/add",  (req, res) => { 
    const { name, salary, date, position } = req.body;
    if (!name || !salary || !date || !position) {
        app.locals.message = "Please provide all the details";
        app.locals.isSuccess = false;
        return res.redirect("/");
    }
    const id = uid();
    db.query(`INSERT INTO employees (id,name, salary, join_date, position) VALUES ('${id}','${name}', ${salary}, '${date}', '${position}')`, (err, result) => { 
        if (err) {
            app.locals.message = "Something went wrong";
            app.locals.isSuccess = false;
            return res.redirect("/");
        }
        app.locals.message = "Employee added successfully";
        app.locals.isSuccess = true;
        return res.redirect("/");
    });

})

app.get("/", (req, res) => {
    res.render('index',{ message: app.locals.message, isSuccess: app.locals.isSuccess});
    app.locals.message = "";
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥 🔥 `));