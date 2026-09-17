const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const sanitizer = require("sanitizer");

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

let todolist = [];

// Display Todo list
app.get("/todo", (req, res) => {
    res.render("todo.ejs", {
        todolist
    });
});

// Add Todo
app.post("/todo/add/", (req, res) => {
    const newTodo = sanitizer.escape(req.body.newtodo || "");

    if (newTodo.trim() !== "") {
        todolist.push(newTodo);
    }

    res.redirect("/todo");
});

// Delete Todo
app.get("/todo/delete/:id", (req, res) => {
    const id = Number(req.params.id);

    if (Number.isInteger(id) && id >= 0 && id < todolist.length) {
        todolist.splice(id, 1);
    }

    res.redirect("/todo");
});

// Edit Todo page
app.get("/todo/:id", (req, res) => {
    const todoIdx = Number(req.params.id);
    const todo = todolist[todoIdx];

    if (todo !== undefined) {
        res.render("edititem.ejs", {
            todoIdx,
            todo
        });
    } else {
        res.redirect("/todo");
    }
});

// Update Todo
// Update Todo
app.put("/todo/edit/:id", (req, res) => {
    const todoIdx = Number(req.params.id);
    const editTodo = sanitizer.escape(req.body.editTodo || "");

    if (
        Number.isInteger(todoIdx) &&
        todoIdx >= 0 &&
        todoIdx < todolist.length &&
        editTodo.trim() !== ""
    ) {
        todolist[todoIdx] = editTodo;
    }

    res.redirect("/todo");
});

// Redirect unknown routes
app.use((req, res) => {
    res.redirect("/todo");
});

// Start server
if (require.main === module) {
    app.listen(port, "0.0.0.0", () => {
        console.log(`Todo application running on port ${port}`);
    });
}

module.exports = app;
