export class TaskController {
    constructor(model, view) {
        this.tasks = []; // Array de instancias de Task
        this.view = view;

        // Suscribir la vista a las acciones del controlador
        this.view.bindAddTask(this.addTask.bind(this));
        this.view.bindToggleTask(this.toggleTask.bind(this));
    }

    addTask(description) {
        const newTask = new Task(description);
        this.tasks.push(newTask);
        this.updateView();
    }

    toggleTask(index) {
        this.tasks[index].toggleStatus();
        this.updateView();
    }

    updateView() {
        this.view.render(this.tasks);
        this.view.clearInput();
    }
}