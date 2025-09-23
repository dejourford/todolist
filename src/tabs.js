// Global Variables
const ls = localStorage
const formPlaceholder = document.querySelector(".form-placeholder");
const tasksSection = document.querySelector(".tasks-section");
const sequence = "tasks_id_sequence"

// create modal for adding new tasks 
function createForm(task = {}) {
    console.log(task)

    formPlaceholder.innerHTML = `
    <div id="addNewTaskModal" class="modal">    
        <form class="new-task-modal">
            <h2 class="form-title">${task.title ? "Edit Task" : "Add New Task"}</h2>
            <input type="hidden" name="id" value="${task.id ?? ""}">
            <section class="form-data">
                <div class="input-item" id="title">
                    <label for="taskTitle">Title</label>
                    <input id="taskTitle" name="title" value="${task.title ?? ""}" required>
                </div>
                <div class="input-item" id="description">
                    <label for="taskDesc">Description</label>
                    <input id="taskDesc" name="description" value="${task.description ?? ""}" required>
                </div>
                <div class="input-item" id="date">
                    <label for="taskDate">Due Date</label>
                    <input id="taskDate" name="due" type="date" value="${task.due ?? ""}" required>
                </div>
                <div class="input-item" id="priority">
                    <label for="taskPriority">Priority</label>
                    <select id="taskPriority" name="priority">
                        <option ${task.priority === "Low" ? "selected" : ""} value="Low">Low</option>
                        <option ${task.priority === "Medium" ? "selected" : ""} value="Medium">Medium</option>
                        <option ${task.priority === "High" ? "selected" : ""} value="High">High</option>
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
                    <textarea id="taskNotes" name="notes">${task.notes ?? ""}</textarea>
                </div>
            </section>
            <div class="form-buttons">
                <button type="button" id="cancelNewTask">Cancel</button>
                <button type="submit">Confirm</button>
            </div>
        </form>
    </div>    
    `

    // cancel button listener
    const cancelBtn = document.querySelector("#cancelNewTask")
    cancelBtn.addEventListener("click", () => {
        formPlaceholder.innerHTML = ""
    })

    // submit form
    const form = document.querySelector("form")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        if (!form.reportValidity()) return;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData)
        const isEdit = Boolean(data.id && String(data.id).trim() !== "")

        // create task object with numeric id
        const task = {
            id: isEdit ? Number(data.id) : nextId(),
            title: String(data.title || "").trim(),
            description: String(data.description || ""),
            due: data.due || "",
            priority: data.priority || "Low",
            project: data.project,
            notes: String(data.notes || ""),
            is_done: isEdit ? undefined : false
        }


        // input validation for project options
        const projectErrorText = document.querySelector(".project-error-text")
        if (data.project == "select") {
            projectErrorText.classList.add("active");
            return;
        }


        projectErrorText.classList.remove("active")


        const tasks = JSON.parse(ls.getItem("tasks") || "[]");

        if (isEdit) {
            const i = tasks.findIndex(t => Number(t.id) === Number(task.id));
            if (i !== -1) {
                // preserve is_done if not set on form
                if (task.is_done === undefined) task.is_done = !!tasks[i].is_done;
                tasks[i] = task;
                ls.setItem("tasks", JSON.stringify(tasks));
            }
        } else {
            tasks.push(task);
            ls.setItem("tasks", JSON.stringify(tasks));
        }


        // remove modal from DOM
        formPlaceholder.innerHTML = "";

        console.log('form data:', data)

        // CHANGED: update the DOM: replace existing task node if editing, else create new
        if (isEdit) {
            const node = tasksSection.querySelector(`[data-id="${task.id}"]`);
            if (node) node.remove();
        }

        createNewTask(task)
        // addTaskToLocalStorage(task)
    })

}


// function to add IDs to tasks
function nextId() {
    const current = Number(ls.getItem(sequence))
    const next = Number.isFinite(current) ? current + 1 : 0
    ls.setItem(sequence, String(next))
    return next;
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
    const tasksToRender = JSON.parse(localStorage.getItem("tasks") || "[]")
    console.log(tasksToRender)

    // for each object in array, create task item and append to tasks section
    if (!Array.isArray(tasksToRender) || tasksToRender.length === 0) return
    tasksToRender.forEach((item) => {
        createNewTask(item)
    })
}


// handle click function
function handleClick(e) {
    const name = e.currentTarget.dataset.tab
    setActiveTab(name)

    if (name === "New Task") {
        createForm()
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
    task.dataset.id = data.id

    // task left
    const left = document.createElement("div");
    left.className = "task-left";

    // task title
    const title = document.createElement("h3");
    title.textContent = data.title || "(Untitled)";

    // task id
    const id = document.createElement("p")
    id.textContent = data.id

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
    if (data.priority === "Medium") {
        task.style.border = "2px solid yellow"
    } else if (data.priority === "High") {
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
    box.checked = !!data.is_done
    box.addEventListener("change", () => {
        task.classList.toggle("checked")
        toggleTaskInLocalStorage(data.id, box.checked)
    });

    // edit button
    const edit = document.createElement("img");
    edit.className = "edit-btn";
    edit.type = "button";
    edit.ariaLabel = "Edit task";
    edit.src = "https://techalotl.github.io/todo-list/fa4977c9aa1ef2c7e07d.svg"
    edit.addEventListener("click", () => {
        console.log('this task has been edited')
        createForm(data)
    })

    // delete button
    const del = document.createElement("img");
    del.className = "delete-btn";
    del.type = "button";
    del.ariaLabel = "Delete task";
    del.textContent = "Delete";
    del.src = "https://techalotl.github.io/todo-list/420a913445f3a27052cb.svg";
    del.addEventListener("click", () => {
        removeTaskFromLocalStorage(data.id)
        task.remove()
    });

    // appendings
    right.append(box, edit, del);
    task.append(left, right);
    tasksSection.append(task);
}

// function to edit existing tasks
function editTask(taskData) {
    console.log(taskData)
    openNewTaskModal()

    console.log(form)

}

// function to add newly created task to local storage
function addTaskToLocalStorage(task) {
    console.log('task added to ls')
    // get current tasks array. if no array then return empty array
    const tasks = JSON.parse(ls.getItem("tasks")) || []
    console.log(tasks)

    // add newly created task to array
    tasks.push(task)

    // add updated array to ls
    ls.setItem("tasks", JSON.stringify(tasks))
}

// function to toggle task in local storage
function toggleTaskInLocalStorage(id, isDone) {
    const tasks = JSON.parse(ls.getItem("tasks") || "[]")
    const i = tasks.findIndex(t => Number(t.id) === Number(id))
    if (i === -1) return
    tasks[i].is_done = !!isDone
    ls.setItem("tasks", JSON.stringify(tasks))
}

// function to remove task from local storage
function removeTaskFromLocalStorage(id) {
    const tasks = JSON.parse(ls.getItem("tasks") || "[]").filter(t => Number(t.id) !== Number(id))
    ls.setItem("tasks", JSON.stringify(tasks))
}

// pill nav listeners
pillNavButtons.forEach((button) => {
    button.addEventListener("click", handleClick)
})




