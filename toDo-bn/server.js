const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const toDoList = []

app.use(cors());
app.use(express.json());

app.post("/texts", (req, res) => {
   req.body.id=Date.now()
    toDoList.push(req.body);
    res.json({ message: "Text added", obj });
});



app.get("/texts", (req, res) => {


    if (req.headers.authorization) {
        console.log(toDoList)
        res.send(toDoList);
    }
    else {
        res.status(401).json({ error: "Unauthorized" });
    }

});

app.patch("/texts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = toDoList.findIndex((item) => item.id === id);

    if (index !== -1) {
        toDoList[index] = { ...toDoList[index], ...req.body };
        res.json({ message: "Task updated", obj: toDoList[index] });
    } else {
        res.status(404).json({ error: "Task not found" });
    }
});

app.delete("/texts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = toDoList.findIndex((item) => item.id === id);

    if (index !== -1) {
        toDoList.splice(index, 1);
        res.json({ message: "Task deleted", id });
    } else {
        res.status(404).json({ error: "Task not found" });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});