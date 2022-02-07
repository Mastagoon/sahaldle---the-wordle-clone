const targetWords = ["woman", "crane", "sugar"]
const guessGrid = document.querySelector(".custom-grid")
const targetWord = targetWords[Math.floor(Math.random() * targetWords.length)]
const alerts = document.querySelector(".alerts")
    // const keys = document.querySelectorAll(".key")
    // const cells = document.querySelectorAll(".cell")
    // const rows = document.querySelectorAll(".row")

// const getActiveRow = () => {
//     return rows.find((r) => r.classList.has("active"))
// }

// const getActiveCell = () => {
//     // const activeCell = getActiveRow()
//     console.log(getActiveRow())
//         // keys[0].
//         // const div = document.createElement("div")
//         // div.children.f

// }

// const keyPress = (e) => {
//     const activeCell = getActiveCell()
// }

const startInteraction = () => {
    document.addEventListener("click", handleClick)
    document.addEventListener("keydown", handleKeyDown)
}

const stopInteraction = () => {
    document.removeEventListener("click", handleClick)
    document.removeEventListener("keydown", handleKeyDown)
}

const handleClick = (e) => {
    if (!e.target.matches(".key")) return
    const dataset = e.target.dataset.key
    if (dataset === "enter") return submit()
    if (dataset === "delete") return deleteChar()
    pressKey(dataset)
}

const handleKeyDown = (e) => {
    if (e.key === "Enter") return submit()
    if (e.key === "Backspace") return deleteChar()

    if (e.key.match(/^[a-z]$/)) pressKey(e.key)
}

const pressKey = (key) => {
    const activeCells = getActiveCells()
    if (activeCells.length > 4) return // grid full
    const next = guessGrid.querySelector(":not([data-character])")
    next.dataset.character = key.toLowerCase()
    next.textContent = key
    next.classList.add("active")
}

const deleteChar = () => {
    const activeCells = getActiveCells()
    if (activeCells.length === 0) return
    const last = activeCells[activeCells.length - 1]
    delete last.dataset.character
    last.textContent = ""
    last.classList.remove("active")
}

const getActiveCells = () => guessGrid.querySelectorAll(".active")

const submit = () => {
    const activeCells = [...getActiveCells()]
    if (activeCells.length < 5) {
        shakeCells(activeCells)
        return showAlert("Not enough letters")
    }

    const guess = activeCells.reduce((acc, c) => acc + c.dataset.character, "")

    // activeCells.forEach
}

const showAlert = (text, dur = 1000) => {
    const alert = document.createElement("div")
    alert.textContent = text
    alert.classList.add("alert")
    alerts.prepend(alert)
    alert.addEventListener("transitionend", () => alert.remove())
    setTimeout(() => alert.classList.add("hide"), dur)
}

const shakeCells = (cells) => {
    cells.forEach(c => {
        c.classList.add("shake")
        c.addEventListener("animationend", () => c.classList.remove("shake"), { once: true })
    })
}

startInteraction()