// Importaciones de funciones
const { addTask, listTasks, removeTask, updateTask  } = require("./tasks");

// Agregar algunas tareas
addTask("Estudiar Node.js");
addTask("Practicar JavaScript");
addTask("Hacer ejercicio");
addTask("ir al supermercado")
// Listar tareas
listTasks();

// Eliminar una tarea
removeTask(1);

// Llamamos a la función para actualizar una tarea
updateTask(1,"compar herlado");


// Listar nuevamente para verificar
listTasks(); 
