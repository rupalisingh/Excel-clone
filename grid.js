let top_row = document.querySelector(".top-row")
let leftcol = document.querySelector(".left-col")
let colstr = ""
for (let k = 0; k < 26; k++) {
    colstr += `<div class = "col">${String.fromCharCode(65 + k)}</div>`
}

top_row.innerHTML = colstr

let str = ""

for (let i = 0; i < 100; i++) {
    str += `<div class = "row">${i + 1}</div>`
}

leftcol.innerHTML = str

// 2d array - for inside grid
let grid = document.querySelector(".inside-grid")
let gridstr = ""
for (let i = 0; i < 100; i++) {
    gridstr += `<div class = "row">`
    for (let j = 0; j < 26; j++) {
        gridstr += `<div class = "col" rid = "${i}" cid = "${j}" contenteditable = "true"></div>`
    }
    gridstr += `</div>`
}

grid.innerHTML = gridstr

// get address of the selected grid
let addressBar = document.querySelector("#address")
let Allcells = document.querySelectorAll(".row > .col")
let celladdress = ""

Allcells[0].click();

for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("click", function handlecell() {
        let rid = Allcells[i].getAttribute("rid")
        let cid = Allcells[i].getAttribute("cid")
        cid = String.fromCharCode(65 + Number(cid))
        rid = Number(rid) + 1
        celladdress = cid + rid
        addressBar.value = celladdress
    })
}



















