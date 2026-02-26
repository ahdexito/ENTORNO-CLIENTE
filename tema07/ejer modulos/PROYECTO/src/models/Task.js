export class TaskModel {
    constructor() {
        // Cargamos datos previos o empezamos con un array vacío
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    _commit(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addTask(text) {
        const task = { id: Date.now(), text, completed: false };
        this.tasks.push(task);
        this._commit(this.tasks);
    }

    toggleTask(id) {
        this.tasks = this.tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        this._commit(this.tasks);
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this._commit(this.tasks);
    }
}