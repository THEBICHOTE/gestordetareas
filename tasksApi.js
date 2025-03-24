const express = require("express");
const { addTask, getTasks, removeTask, updateTask } = require("./tasks");

const app = express();
app.use(express.json()); // Middleware para manejar JSON

// Obtener todas las tareas
app.get("/tasks", (req, res) => {
    res.json(getTasks());
});

// Agregar una nueva tarea
app.post("/tasks", (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: "La tarea es obligatoria" });
    }
    const result = addTask(task);
    if (result.error) {
        return res.status(400).json(result);
    }
    res.json({ message: "Tarea agregada", tasks: getTasks() });
});

// Actualizar una tarea existente
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { newTask } = req.body;
    if (!newTask) {
        return res.status(400).json({ error: "La nueva tarea es obligatoria" });
    }
    const result = updateTask(id, newTask);
    if (result.error) {
        return res.status(400).json(result);
    }
    res.json({ message: "Tarea actualizada", tasks: getTasks() });
});

// Eliminar una tarea por índice
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const result = removeTask(id);
    if (result.error) {
        return res.status(400).json(result);
    }
    res.json({ message: "Tarea eliminada", tasks: getTasks() });
});

// Iniciar servidor (solo para pruebas locales)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
});

module.exports = app;
