// Global Variables
const ls = localStorage
const pillNavButtons = document.querySelectorAll(".pill-item")

// set active tab function when clicked
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
}

// CREATE INPUT FORM FOR NEW TASK AND APPEND TO APP
const addNewTaskModal = `
<form class="new-task-modal">
    <h2 class="form-title"></h2>
    <section class="form-data">
        <div class="input-item" id="title">
            <label for="Title">Title</label>
            <input>
        </div>
        <div class="input-item" id="description">
            <label for="Description">Description</label>
            <input>
        </div>
        <div class="input-item" id="date">
            <label for="Due Date">Due Date</label>
            <input type="date">
        </div>
        <div class="input-item" id="priority">
            <label for="Priority">Priority</label>
            <select>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
        </div>
        <div class="input-item" id="project">
            <label for="Project">Project</label>
            
        </div>
        <div class="input-item" id="notes">
            <label for="Notes">Notes</label>
            <textarea name="notes"></textarea>
        </div>
    </section>
    <div class="form-buttons">
        <button type="button">Cancel</button>
        <button type="submit">Confirm</button>
    </div>
</form>
`


// form + title 
const form = document.createElement("form")
const formTitle = document.createElement("h2")
formTitle.classList.add("form-title")
formTitle.textContent = "Add New Task"

// title input
const titleInput = document.createElement("input")
titleInput

// append form title 
form.append(formTitle)


// append form to app
app.insertAdjacentHTML("beforeend", addNewTaskModal)

// pill nav listeners
pillNavButtons.forEach((button) => {
    button.addEventListener("click", handleClick)
})

// pick initial tab
setActiveTab(ls.getItem("activeTab") || "Tasks")
