const express = require("express");
const { addTask, listTasks, removeTask, updateTask, getTasks } = require("./tasks");

const app = express();
app.use(express.json()); // Middleware para parsear JSON

// Endpoint para obtener todas las tareas
app.get("/tasks", (req, res) => {
    res.json(getTasks());
});

// Endpoint para agregar una tarea
app.post("/tasks", (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: "La tarea es obligatoria" });
    }
    addTask(task);
    res.json({ message: "Tarea agregada" });
});

// Endpoint para eliminar una tarea por índice
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }
    removeTask(id);
    res.json({ message: "Tarea eliminada" });
});

// Endpoint para actualizar una tarea
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { newTask } = req.body;
    if (isNaN(id) || !newTask) {
        return res.status(400).json({ error: "Datos inválidos" });
    }
    updateTask(id, newTask);
    res.json({ message: "Tarea actualizada" });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
});
