const keys = document.querySelectorAll(".key")
const cells = document.querySelectorAll(".cell")
const rows = document.querySelectorAll(".row")

const getActiveRow = () => {
    return rows.find((r) => r.classList.has("active"))
}

const getActiveCell = () => {
    // const activeCell = getActiveRow()
    console.log(getActiveRow())
        // keys[0].
        // const div = document.createElement("div")
        // div.children.f

}

const keyPress = (e) => {
    const activeCell = getActiveCell()
}

const startInteraction = () => {
    document.addEventListener("keypress", keyPress)
    keys.forEach((k, i) => k.addEventListener("click", keyPress))
}

startInteraction()