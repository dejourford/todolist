const app = document.querySelector("#app")

function renderApp() {
    
    // create header and append to app
    const header = document.createElement("h1")
    header.textContent = "ToDoList"

    // create pill nav section and append to app
    const pillNavSection = document.createElement("section")
    pillNavSection.className = "pill-nav"

    // create pill nav items and append to pill nav section
    const pillNavItemsArray = ["New Task", "New Project", "Today", "This Week", "Projects", "Tasks"]
    pillNavItemsArray.forEach((name) => {
        const button = document.createElement("button")
        button.textContent = name;
        button.dataset.tab = name;
        button.className = "pill-item"
        pillNavSection.append(button)
    })

    // create tasks section and append to app
    const tasksSection = document.createElement("section")
    tasksSection.className = "tasks-section"

    // append elements
    app.append(header, pillNavSection, tasksSection)    
}

renderApp()