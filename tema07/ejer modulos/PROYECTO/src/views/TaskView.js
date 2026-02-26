export class TaskView {
    constructor() {
        this.app = document.getElementById('app');
        this.taskList = document.getElementById('task-list');
        this.input = document.getElementById('task-input');
        this.form = document.getElementById('task-form');
    }

    render(tasks) {
        this.taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.id = task.id;
            if (task.completed) li.classList.add('completed');

            li.innerHTML = `
                <span>${task.text}</span>
                <button class="delete-btn" data-id="${task.id}">Borrar</button>
            `;
            this.taskList.appendChild(li);
        });
    }

    bindEvents(onAdd, onToggle, onDelete) {
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            if (this.input.value) {
                onAdd(this.input.value);
                this.input.value = '';
            }
        });

        this.taskList.addEventListener('click', e => {
            const id = parseInt(e.target.parentElement.id || e.target.dataset.id);
            if (e.target.classList.contains('delete-btn')) {
                onDelete(id);
            } else {
                onToggle(id);
            }
        });
    }
}