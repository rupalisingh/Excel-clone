let DeleteFile = document.querySelector(".Delete")
let openFile = document.querySelector(".Open")
let saveFile = document.querySelector(".Save")


saveFile.addEventListener("click", function () {
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

openFile.addEventListener("click", function () {  
    let inputFile = document.createElement("input")
    inputFile.type = "file"
    inputFile.click()

    if(!inputFile) return;

    inputFile.addEventListener("change",function(){
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