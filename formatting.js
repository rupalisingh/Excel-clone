let buiarr = document.querySelectorAll(".biu > .fas")
let alignarr = document.querySelectorAll(".alignment > .fas")

let curraddress = document.querySelector("#address")
let sheetdB = worksheetdB[0]

// alignment

let leftalign = document.querySelector("#left")
let centeralign = document.querySelector("#center")
let rightalign = document.querySelector("#right")

// Bold Italic Underline

let boldElem = document.querySelector(".fa-bold")
let italicElem = document.querySelector(".fa-italic")
let underlineElem = document.querySelector(".fa-underline")

// Font size and Font-family

let fontfamily = document.querySelector("#input-font")
let fontsize = document.querySelector("#font-size")

// fill and text color

let textcolor = document.querySelector("#textcolor")
let fillcolor = document.querySelector("#fillcolor")



leftalign.addEventListener("click", function () {
    let address = curraddress.value
    let { cid, rid } = getRIdCIdfromAddress(address)
    let cell = document.querySelector(`.col[rid= "${rid}"][cid = "${cid}"]`)
    cell.style.textAlign = "left"
    alignarr.forEach(function (align) {
        align.classList.remove("active-button")
    })

    if (!leftalign.classList[2]) {
        leftalign.classList.add("active-button")
    }
})

rightalign.addEventListener("click", function () {
    let address = curraddress.value
    let { cid, rid } = getRIdCIdfromAddress(address)
    let cell = document.querySelector(`.col[rid= "${rid}"][cid = "${cid}"]`)
    cell.style.textAlign = "right"

    alignarr.forEach(function (align) {
        align.classList.remove("active-button")
    })

    if (!rightalign.classList[2]) {
        rightalign.classList.add("active-button")
    }
})

centeralign.addEventListener("click", function () {
    let address = curraddress.value
    let { cid, rid } = getRIdCIdfromAddress(address)
    let cell = document.querySelector(`.col[rid= "${rid}"][cid = "${cid}"]`)
    cell.style.textAlign = "center"

    alignarr.forEach(function (align) {
        align.classList.remove("active-button")
    })

    if (!centeralign.classList[2]) {
        centeralign.classList.add("active-button")
    }
})


boldElem.addEventListener("click", function () {
    let address = curraddress.value
    let { cid, rid } = getRIdCIdfromAddress(address)
    let cell = document.querySelector(`.col[rid= "${rid}"][cid = "${cid}"]`)


    buiarr.forEach(function (elem) {
        elem.classList.remove("active-button")
    })

    if (!boldElem.classList[2]) {
        boldElem.classList.add("active-button")
        cell.style.fontWeight = "bold"
        let cellobj = sheetdB[rid][cid]
        cellobj.bold = true
    } else {
        boldElem.classList.remove("active-button")
        cell.style.fontWeight = "normal"
        let cellobj = sheetdB[rid][cid]
        cellobj.bold = false
    }


})

italicElem.addEventListener("click", function () {
    let address = curraddress.value
    let { cid, rid } = getRIdCIdfromAddress(address)
    let cell = document.querySelector(`.col[rid= "${rid}"][cid = "${cid}"]`)
    cell.style.fontStyle = "italic"
    let cellobj = sheetdB[rid][cid]
    cellobj.italic = "italic"

    buiarr.forEach(function (elem) {
        elem.classList.remove("active-button")
    })

    if (!italicElem.classList[2]) {
        italicElem.classList.add("active-button")
    }

})

underlineElem.addEventListener("click", function () {
    let address = curraddress.value
    let { cid, rid } = getRIdCIdfromAddress(address)
    let cell = document.querySelector(`.col[rid= "${rid}"][cid = "${cid}"]`)
    cell.style.textDecoration = "underline"
    let cellobj = sheetdB[rid][cid]
    cellobj.underline = "underline"

    buiarr.forEach(function (elem) {
        elem.classList.remove("active-button")
    })

    if (!underlineElem.classList[2]) {
        underlineElem.classList.add("active-button")
    }
})


fontfamily.addEventListener("change", function () {
    let address = curraddress.value
    let { cid, rid } = getRIdCIdfromAddress(address)
    let cell = document.querySelector(`.col[rid= "${rid}"][cid = "${cid}"]`)
    let font = fontfamily.value
    cell.style.fontFamily = font
    let cellobj = sheetdB[rid][cid]
    cellobj.fontFamily = font
})


fontsize.addEventListener("change", function () {
    let address = curraddress.value
    let { cid, rid } = getRIdCIdfromAddress(address)
    let cell = document.querySelector(`.col[rid= "${rid}"][cid = "${cid}"]`)
    let size = fontsize.value
    cell.style.fontSize = size + "px"
    let cellobj = sheetdB[rid][cid]
    cellobj.fontSize = size + "px"
})

textcolor.addEventListener("change", function () {
    let address = curraddress.value
    let { cid, rid } = getRIdCIdfromAddress(address)
    let cell = document.querySelector(`.col[rid= "${rid}"][cid = "${cid}"]`)
    let color = textcolor.value
    cell.style.color = color
    let cellobj = sheetdB[rid][cid]
    cellobj.textcolor = color
})

fillcolor.addEventListener("change", function () {
    let address = curraddress.value
    let { cid, rid } = getRIdCIdfromAddress(address)
    let cell = document.querySelector(`.col[rid= "${rid}"][cid = "${cid}"]`)
    let color = fillcolor.value
    cell.style.backgroundColor = color
    let cellobj = sheetdB[rid][cid]
    cellobj.fillcolor = color
})


for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("blur", function () {
        let address = curraddress.value
        let { cid, rid } = getRIdCIdfromAddress(address)
        let cell = document.querySelector(`.col[rid= "${rid}"][cid = "${cid}"]`)
        let cellobj = sheetdB[rid][cid]
        cellobj.value = cell.innerText
        cellobj.parent = address
        UpdateChildrenValue(address)
        
    })

    Allcells[i].addEventListener("keydown", function (e) {
        let address = curraddress.value;
        let { cid, rid } = getRIdCIdfromAddress(address);
        let cellsel = e.currentTarget
        let height = cellsel.scrollHeight;
        let entirerow = document.querySelectorAll(".inside-grid .row")[rid];
        entirerow.style.height = height + "px";
        let leftcol = document.querySelectorAll(".left-col .row")[rid];
        leftcol.style.height = height + "px";

    })

    Allcells[i].addEventListener("click", function() {
        let address = curraddress.value;
        let { cid, rid } = getRIdCIdfromAddress(address);
        setFormulaBarUI(rid, cid)
    })
}


function setFormulaBarUI(rid,cid) {
    let formulabar = document.querySelector(".formula-bar")
    let formulacellobj = sheetdB[rid][cid]
    if(formulacellobj.formula != ""){
        console.log(formulacellobj)
        formulabar.value = formulacellobj.formula
    }else{
        formulabar.value = ""
    }
}


function getRIdCIdfromAddress(address) {
    // A1
    let cellColAdr = address.charCodeAt(0);
    // console.log(cellColAdr);
    let cellrowAdr = address.slice(1);
    let cid = cellColAdr - 65;
    let rid = Number(cellrowAdr) - 1;
    return { cid, rid };

}
