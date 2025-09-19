// Global Variables
const ls = localStorage

// CREATE INPUT FORM FOR NEW TASK AND APPEND TO APP
const addNewTaskModal = `
<div id="addNewTaskModal" class="modal">    
    <form class="new-task-modal">
        <h2 class="form-title">Add New Task</h2>
        <section class="form-data">
            <div class="input-item" id="title">
                <label for="taskTitle">Title</label>
                <input id="taskTitle" name="title">
            </div>
            <div class="input-item" id="description">
                <label for="taskDesc">Description</label>
                <input id="taskDesc" name="description">
            </div>
            <div class="input-item" id="date">
                <label for="Due Date">Due Date</label>
                <input id="taskDate" name="due" type="date">
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
                <select id="taskProject" name="project">
                    <option value="inbox">Inbox</option>
                </select>
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
    modal.setAttribute("aria-hidden", false)
}

// function to close new task modal
function closeNewTaskModal() {
    form.reset()
    modal.classList.remove("active")
    modal.setAttribute("aria-hidden", true)
}


// set active tab function when clicked
const pillNavButtons = document.querySelectorAll(".pill-item")
function setActiveTab(name) {   

    pillNavButtons.forEach((button) => {
        const isActive = button.dataset.tab === name
        button.classList.toggle("active", isActive)
        button.setAttribute("aria-selected", isActive)
    })

    // remember selection
    ls.setItem("activeTab", name)
}

// handle click function
function handleClick(e) {
    const name = e.currentTarget.dataset.tab
    setActiveTab(name)

    if (name === "New Task") {
        openNewTaskModal()
    }
}


// pill nav listeners
pillNavButtons.forEach((button) => {
    button.addEventListener("click", handleClick)
})

// close button listener
const modalCloseButton = document.querySelector("#cancelNewTask")
modalCloseButton.addEventListener("click", closeNewTaskModal)

// pick initial tab
setActiveTab(ls.getItem("activeTab") || "Tasks")
