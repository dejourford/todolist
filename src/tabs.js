// Global Variables
const ls = localStorage
const pillNavButtons = document.querySelectorAll(".pill-item")

function handleClick(e) {   
    const activePillNav = e.currentTarget.dataset.tab
    console.log(activePillNav)
    
    // remove active class from all buttons
    pillNavButtons.forEach((button) => button.classList.remove("active"))

    // add active class to active button
    e.currentTarget.classList.add("active")
}


pillNavButtons.forEach((button) => {
    button.addEventListener("click", handleClick)
})
