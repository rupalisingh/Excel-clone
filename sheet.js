let rows = document.querySelectorAll(".row")
let formulabar = document.querySelector("#formula")
let addsheetBtn = document.querySelector(".fa-plus")
let sheetlist = document.querySelector(".sheet-list")
let sheetsarr = document.querySelectorAll(".sheet")
let idx = 0

addsheetBtn.addEventListener("click", function(){
    sheetsarr = document.querySelectorAll(".sheet")
    let lastelemidx = sheetsarr.length - 1
    let newidx = lastelemidx + 1
    let newsheet = document.createElement("div")
    newsheet.setAttribute("class", "sheet")
    newsheet.innerText = `Sheet${newidx + 1}`
    sheetlist.appendChild(newsheet)

    sheetsarr.forEach(function(sheet){
        sheet.classList.remove("active-sheet")  
    })

    sheetsarr = document.querySelectorAll(".sheet")
    sheetsarr[sheetsarr.length - 1].classList.add("active-sheet")

    currSheetDb()
    sheetdB = worksheetdB[newidx]

    initui()

    for(let i = 0; i < sheetsarr.length; i++){

        sheetsarr[i].addEventListener("click", handleActiveSheet)
    }

})


function handleActiveSheet(e){
    let mysheet = e.currentTarget
    sheetsarr = document.querySelectorAll(".sheet")

    sheetsarr.forEach(function(sheet){
        sheet.classList.remove("active-sheet")
    })
    
    if(!mysheet.classList[1]){
        mysheet.classList.add("active-sheet")
    }

    for(let i = 0; i < sheetsarr.length; i++){
        if(sheetsarr[i] == mysheet){
            idx = i
        }
    }
    sheetdB = worksheetdB[idx]
    
    setUI(sheetdB)
    console.log(worksheetdB)

}



function initui(){
    for(let i = 0 ; i < Allcells.length; i++){
        Allcells[i].style.fontWeight = "normal"
        Allcells[i].style.fontStyle = "normal"
        Allcells[i].style.textDecoration = "none"
        Allcells[i].style.fontFamily = "Times New Roman"
        Allcells[i].style.fontSize = "11px"
        Allcells[i].style.textAlign = "left"
        Allcells[i].style.color = "none"
        Allcells[i].style.backgroundColor = "transparent"
        Allcells[i].innerText = ""
        formula.value = ""  
    }

}


function setUI(sheetdB){
    for(let i = 0; i < sheetdB.length; i++){
        for(let j = 0; j < sheetdB[i].length; j++){
            let cell = document.querySelector(`.row > .col[rid="${i}"][cid="${j}"]`);
            let {bold, italic, underline, fontFamily, fontSize, halign, textcolor, fillcolor, value} = sheetdB[i][j]
            let {formula} = sheetdB[0][0]
            formulabar.value = formula
            cell.style.fontWeight = bold == true ? "bold" : "normal"
            cell.innerText = value
            cell.style.backgroundColor = fillcolor
        }
    }
}
