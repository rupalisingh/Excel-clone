let body = document.body
let DeleteFile = document.querySelector(".Delete")
let openFile = document.querySelector(".Open")
let saveFile = document.querySelector(".Save")


saveFile.addEventListener("click", function() {
    let totalsheet = document.querySelectorAll(".sheet")
    for (let i = 0; i < totalsheet.length; i++) {
        if (totalsheet[i].classList.contains("active-sheet")) {
            let filenameObj = document.querySelector("#sheetName")
            let filename = filenameObj.value
            let data = JSON.stringify(worksheetdB[i])
            let file = new Blob([data], { type: 'application/json' })
            let fileURL = URL.createObjectURL(file)
            let a = document.createElement("a")
            a.href = fileURL
            a.download = filename
            a.click()
        }

    }

});

openFile.addEventListener("click", function() {
    let inputFile = document.createElement("input")
    inputFile.type = "file"
    inputFile.click()

    if (!inputFile) return;

    inputFile.addEventListener("change", function() {
        let Files = inputFile.files
        let selectedFile = Files[0]
        let reader = new FileReader()
        reader.onload = function(evt) {
            sheetdB = JSON.parse(evt.target.result)
            setUI(sheetdB)

        };
        reader.readAsText(selectedFile);

    })

})



DeleteFile.addEventListener("click", deleteSheet)

function deleteSheet() {
    deletePopup()

    let deleteclicked = document.querySelector(".modal.Delete")
    let closeclicked = document.querySelector(".Close")
    let modalContainer = document.querySelector(".modal-container")

    deleteclicked.addEventListener("click", function() {
        let sheetlist = document.querySelectorAll(".sheet")
        if (sheetlist.length == 1) {
            alert("Cannot delete the Only sheet left in workbook")
        } else {
            for (let i = 0; i < sheetlist.length; i++) {
                if (sheetlist[i].classList.contains("active-sheet")) {
                    sheetlist[i].classList.remove("active-sheet")
                    sheetlist[i].remove()
                    sheetlist[i - 1].classList.add("active-sheet")
                    body.removeChild(modalContainer)
                    break

                }
            }
        }

    })

    closeclicked.addEventListener("click", function() {
        body.removeChild(modalContainer)
    })


}

function deletePopup() {
    let modalContainer = document.querySelector(".modal-container")
    modalContainer = document.createElement("div")
    modalContainer.setAttribute("class", "modal-container")
    modalContainer.innerHTML = `
    <div class="inside-message message1">All your data will be lost.</div>
    <div class="inside-message message2">Do you still want to Delete the Sheet?</div>
    <button class="modal Close">Close</button>
    <button class="modal Delete">Delete</button>
</div>`

    body.appendChild(modalContainer)
}