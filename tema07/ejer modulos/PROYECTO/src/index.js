import { TaskView } from './views/TaskView.js';
import { TaskController } from './controllers/TaskController.js';
import { Task } from './models/Task.js';

// Inicializamos la aplicación
const app = new TaskController(Task, new TaskView());