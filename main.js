const targetWords = ["woman", "crane", "sugar"]
const guessGrid = document.querySelector(".custom-grid")
const targetWord = targetWords[Math.floor(Math.random() * targetWords.length)]
const alerts = document.querySelector(".alerts")
const keyboard = document.querySelector(".keyboard")
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
    stopInteraction()
    activeCells.forEach((cell, i, arr) => flipCell(cell, i, arr, guess))
}

const flipCell = (cell, i, arr, guess) => {
    const char = cell.dataset.character
    const key = keyboard.querySelector(`[data-key=${char}]`)
    setTimeout(() => {
        cell.classList.add("flip")
    }, i * 500 / 2)
    cell.addEventListener("transitionend", () => {
        cell.classList.remove("flip")
        cell.classList.remove("active")
        if (targetWord[i] === char) {
            cell.classList.add("correct")
            key.classList.add("correct")
        } else if (targetWord.includes(char)) {
            cell.classList.add("wrong-location")
            key.classList.add("wrong-location")
        } else {
            cell.classList.add("wrong")
            key.classList.add("wrong")
        }
        if (i === arr.length - 1) {
            cell.addEventListener("transitionend", () => {
                startInteraction()
                checkEnd(guess, arr)
            }, { once: true })
        }
    }, { once: true })
}

const checkEnd = (guess, cells) => {
    if (guess === targetWord) {
        stopInteraction()
        showAlert("You win واو شاطر")
        return danceCells(cells)
    }
    if (guessGrid.querySelectorAll(":not([data-character])").length === 0) {
        stopInteraction()
        showAlert("You lose. try again tomorrow", null)
    }
}

const showAlert = (text, dur = 1000) => {
    const alert = document.createElement("div")
    alert.textContent = text
    alert.classList.add("alert")
    alerts.prepend(alert)
    alert.addEventListener("transitionend", () => alert.remove())
    dur &&
        setTimeout(() => alert.classList.add("hide"), dur)
}

const shakeCells = (cells) => {
    cells.forEach(c => {
        c.classList.add("shake")
        c.addEventListener("animationend", () => c.classList.remove("shake"), { once: true })
    })
}

const danceCells = (cells) => {
    cells.forEach((c, i) => {
        setTimeout(() => {

            c.classList.add("dance")
            c.addEventListener("animationend", () => c.classList.remove("shake"), { once: true })
        }, i * 100)
    })
}

startInteraction()