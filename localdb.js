let worksheetdB = []
function currSheetDb() {
    let sheetdB = []
    for (let i = 0; i < 100; i++) {
        let row = []
        for (let j = 0; j < 26; j++) {
            let cell = {
                bold: false,
                italic: "normal",
                underline: "none",
                fontFamily: "Times New Roman",
                fontSize: "11",
                halign: "left",
                textcolor : "none",
                fillcolor : "transparent",
                value: "",
                formula: "",
            }
            row.push(cell)
        }
        sheetdB.push(row)
        
    }
    worksheetdB.push(sheetdB)
}

currSheetDb()

