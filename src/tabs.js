// Global Variables
const ls = localStorage
const tasksSection = document.querySelector(".tasks-section");


// create modal for adding new tasks 
const addNewTaskModal = `
<div id="addNewTaskModal" class="modal">    
    <form class="new-task-modal">
        <h2 class="form-title">Add New Task</h2>
        <section class="form-data">
            <div class="input-item" id="title">
                <label for="taskTitle">Title</label>
                <input id="taskTitle" name="title" required>
            </div>
            <div class="input-item" id="description">
                <label for="taskDesc">Description</label>
                <input id="taskDesc" name="description" required>
            </div>
            <div class="input-item" id="date">
                <label for="taskDate">Due Date</label>
                <input id="taskDate" name="due" type="date" required>
            </div>
            <div class="input-item" id="priority">
                <label for="taskPriority">Priority</label>
                <select id="taskPriority" name="priority">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <div class="input-item" id="project">
                <label for="taskProject">Project</label>
                <select id="taskProject" name="project" required>
                <option value="select">Select Project</option>    
                <option value="inbox">Inbox</option>
                </select>

                <p class="project-error-text">Please select a project.</p>
            </div>
            <div class="input-item" id="notes">
                <label for="taskNotes">Notes</label>
                <textarea id="taskNotes" name="notes"></textarea>
            </div>
        </section>
        <div class="form-buttons">
            <button type="button" id="cancelNewTask">Cancel</button>
            <button type="submit">Confirm</button>
        </div>
    </form>
</div>    
`

// append form to app
app.insertAdjacentHTML("beforeend", addNewTaskModal)
const modal = document.querySelector("#addNewTaskModal")
const form = modal.querySelector("form")
const cancelBtn = document.querySelector("#cancelNewTask")

// function to open new task modal
function openNewTaskModal() {
    modal.classList.add("active")
    modal.setAttribute("aria-hidden", "false")
}

// function to close new task modal
function closeNewTaskModal() {
    form.reset()
    modal.classList.remove("active")
    modal.setAttribute("aria-hidden", "true")
}


// set active tab function when clicked
const pillNavButtons = document.querySelectorAll(".pill-item")
function setActiveTab(name) {

    pillNavButtons.forEach((button) => {
        const isActive = button.dataset.tab === name
        button.classList.toggle("active", isActive)
        button.setAttribute("aria-selected", isActive)
    })

}

// function to display all tasks on pill nav click
function renderAllTasks() {
    // clear dom of previous tasks
    tasksSection.innerHTML = ""

    // get tasks from local storage, if none, then return
    const tasksToRender = JSON.parse(localStorage.getItem("tasks"))
    console.log(tasksToRender)
    
    // for each object in array, create task item and append to tasks section
    tasksToRender.forEach((item) => {
        createNewTask(item)
    })
}


// handle click function
function handleClick(e) {
    const name = e.currentTarget.dataset.tab
    setActiveTab(name)

    // close modal if opened
    closeNewTaskModal()

    if (name === "New Task") {
        openNewTaskModal()
    } else if (name === "Tasks") {
        renderAllTasks()
    }
}


// function to create task from form data
function createNewTask(data) {
    if (!tasksSection) return;

    // task
    const task = document.createElement("section");
    task.className = "task";

    // task left
    const left = document.createElement("div");
    left.className = "task-left";

    // task title
    const title = document.createElement("h3");
    title.textContent = data.title || "(Untitled)";

    // task description
    const desc = document.createElement("p");
    desc.textContent = data.description || "";

    // task due date
    const due = document.createElement("p");
    due.textContent = data.due ? `Due Date: ${data.due}` : "";

    // task priority
    const priority = document.createElement("p")
    priority.textContent = data.priority ? `Priority: ${data.priority}` : "";
    
    // add border color based on priority property value
    if (priority.textContent.includes("Medium")) {
        task.style.border = "2px solid yellow"
    } else if (priority.textContent.includes("High")) {
        task.style.border = "2px solid red"
    }

    // task notes
    const notes = document.createElement("p");
    notes.textContent = data.notes ? `Notes: ${data.notes}` : "";
    left.append(title, desc, due, priority, notes);
    
    // right side of task
    const right = document.createElement("div");
    right.className = "task-right";

    // checkbox
    const box = document.createElement("input");
    box.type = "checkbox";
    box.addEventListener("change", () => { 
        task.classList.toggle("checked")
     });

    // edit button
    const edit = document.createElement("img");
    edit.className = "edit-btn";
    edit.type = "button";
    edit.ariaLabel = "Edit task";
    edit.src = "https://techalotl.github.io/todo-list/fa4977c9aa1ef2c7e07d.svg"

     // delete button
    const del = document.createElement("img");
    del.className = "delete-btn";
    del.type = "button";
    del.ariaLabel = "Delete task";
    del.textContent = "Delete";
    del.src = "https://techalotl.github.io/todo-list/420a913445f3a27052cb.svg";
    del.addEventListener("click", () => task.remove());

    // appendings
    right.append(box, edit, del);
    task.append(left, right);
    tasksSection.append(task);
}

// function to add newly created task to local storage
function addTaskToLocalStorage(data) {
    console.log('task added to ls')
    // get current tasks array. if no array then return empty array
    const tasks = JSON.parse(ls.getItem("tasks")) || []
    console.log(tasks)
    
    // add newly created task to array
    tasks.push(data)

    // add updated array to ls
    ls.setItem("tasks", JSON.stringify(tasks))
}

// pill nav listeners
pillNavButtons.forEach((button) => {
    button.addEventListener("click", handleClick)
})

// close button listener
const modalCloseButton = document.querySelector("#cancelNewTask")
modalCloseButton.addEventListener("click", closeNewTaskModal)

// confirm button listener
form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData)
    
    // input validation for project options
    const projectErrorText = document.querySelector(".project-error-text")
    if (data.project == "select") {
        projectErrorText.classList.add("active");
        return;
    }

    form.reset()
    projectErrorText.classList.remove("active")
    closeNewTaskModal()
    console.log('form data:', data)
    createNewTask(data)
    addTaskToLocalStorage(data)
})

