const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const toDoList=[]

app.use(cors());
app.use(express.json());

app.post("/texts", (req, res) => {
   
    const obj = req.body;

    toDoList.push(obj);
    res.json({ message: "Text added", obj});
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/texts", (req, res) => {
    console.log(toDoList)
    res.send(toDoList);
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


  