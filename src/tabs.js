// Global Variables
const ls = localStorage

// create modal for adding new tasks 
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

}

// handle click function
function handleClick(e) {
    const name = e.currentTarget.dataset.tab
    setActiveTab(name)

    // close modal if opened
    closeNewTaskModal()

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

// confirm button listener
form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData)
    form.reset()

    console.log('form data:', data)
})

