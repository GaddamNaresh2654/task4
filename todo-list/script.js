// Task Management with LocalStorage
class TodoApp {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.editingTaskId = null;
        
        this.init();
    }

    init() {
        this.loadTasks();
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        const addTaskBtn = document.getElementById('addTaskBtn');
        const taskInput = document.getElementById('taskInput');
        const clearCompletedBtn = document.getElementById('clearCompleted');
        const filterButtons = document.querySelectorAll('.filter-btn');

        // Add task on button click
        addTaskBtn.addEventListener('click', () => this.addTask());

        // Add task on Enter key
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });

        // Clear completed tasks
        clearCompletedBtn.addEventListener('click', () => this.clearCompleted());

        // Filter buttons
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.render();
            });
        });
    }

    loadTasks() {
        const storedTasks = localStorage.getItem('todoTasks');
        if (storedTasks) {
            this.tasks = JSON.parse(storedTasks);
        }
    }

    saveTasks() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    }

    addTask() {
        const taskInput = document.getElementById('taskInput');
        const text = taskInput.value.trim();

        if (text === '') {
            alert('Please enter a task!');
            return;
        }

        if (this.editingTaskId !== null) {
            // Edit existing task
            const task = this.tasks.find(t => t.id === this.editingTaskId);
            if (task) {
                task.text = text;
                this.editingTaskId = null;
                taskInput.classList.remove('edit-mode');
                document.getElementById('addTaskBtn').textContent = 'Add Task';
            }
        } else {
            // Add new task
            const newTask = {
                id: Date.now(),
                text: text,
                completed: false,
                createdAt: new Date().toISOString()
            };
            this.tasks.push(newTask);
        }

        taskInput.value = '';
        this.saveTasks();
        this.render();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
        this.render();
    }

    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            const taskInput = document.getElementById('taskInput');
            taskInput.value = task.text;
            taskInput.focus();
            taskInput.classList.add('edit-mode');
            this.editingTaskId = id;
            document.getElementById('addTaskBtn').textContent = 'Update Task';
        }
    }

    clearCompleted() {
        this.tasks = this.tasks.filter(t => !t.completed);
        this.saveTasks();
        this.render();
    }

    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            default:
                return this.tasks;
        }
    }

    render() {
        const taskList = document.getElementById('taskList');
        const emptyState = document.getElementById('emptyState');
        const taskCount = document.getElementById('taskCount');
        const filteredTasks = this.getFilteredTasks();

        // Update task count
        const activeTasks = this.tasks.filter(t => !t.completed).length;
        taskCount.textContent = `${activeTasks} ${activeTasks === 1 ? 'task' : 'tasks'}`;

        // Clear task list
        taskList.innerHTML = '';

        // Show empty state if no tasks
        if (filteredTasks.length === 0) {
            emptyState.classList.add('show');
        } else {
            emptyState.classList.remove('show');
        }

        // Render tasks
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''}
                    data-id="${task.id}"
                >
                <span class="task-text">${this.escapeHtml(task.text)}</span>
                <div class="task-actions">
                    <button class="edit-btn" data-id="${task.id}">Edit</button>
                    <button class="delete-btn" data-id="${task.id}">Delete</button>
                </div>
            `;

            // Add event listeners
            const checkbox = li.querySelector('.task-checkbox');
            const editBtn = li.querySelector('.edit-btn');
            const deleteBtn = li.querySelector('.delete-btn');

            checkbox.addEventListener('change', () => this.toggleTask(task.id));
            editBtn.addEventListener('click', () => this.editTask(task.id));
            deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

            taskList.appendChild(li);
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
