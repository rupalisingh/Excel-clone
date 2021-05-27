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

    let deleteclicked = document.querySelector(".Delete")
    let closeclicked = document.querySelector(".Close")
    let modalContainer = document.querySelector(".modal-container")

    deleteclicked.addEventListener("click", function() {


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