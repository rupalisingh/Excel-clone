
formula.addEventListener("keydown", function (e) {
    if (e.key == "Enter" && formula.value != "") {
        let exp = formula.value
        let resultaddress = addressBar.value                              //children
        let res = solve(exp,resultaddress, "")
        let { cid, rid } = getRIdCIdfromAddress(resultaddress)
        let resultcellObj = sheetdB[rid][cid]
        resultcellObj.formula = exp
        setUIformula(res, rid, cid)
        console.log(worksheetdB)
    }


})


function solve(exp, resultaddress, parentaddress) {
    let operand = []
    let operator = []
    exp = exp.replace(/ /g, "")
    let isOperator = false
    let str = ""
    for (let i = 0; i < exp.length; i++) {
        let ch = exp.charAt(i)
        isOperator = false
        if (ch == '(' || ch == '+' || ch == '-' || ch == '*' || ch == '/') {
            operator.push(ch)
            isOperator = true
            if (str != "") {
                operand.push(str)
                str = ""
            }
        }
        else if (operator.length != 0 && ch == ')') {
            if (str != "") {
                operand.push(str)
                str = ""
            }
            let op = operator.pop()
            evaluate(op, operand, resultaddress, parentaddress)
        } else {
            if (isOperator == false) {
                str = str + ch
            }
        }
    }
 
    while (operand.length > 1) {
        let remop = operator.pop()
        evaluate(remop, operand, resultaddress, parentaddress)
    }

    return operand.pop()
}

function evaluate(op, operand, resultaddress, parentaddress) {
    let v1 = operand.pop()
    let v2 = operand.pop()

    if (isNaN(Number(v1) / 100) == true) {
        let { cid, rid } = getRIdCIdfromAddress(v1)
        cellobj = sheetdB[rid][cid]
        v1 = cellobj.value
        if(resultaddress != parentaddress){
            ParentChildrelation(resultaddress, rid, cid)
        }
    }

    if (isNaN(Number(v2) / 100) == true) {
        let { cid, rid } = getRIdCIdfromAddress(v2)
        cellobj = sheetdB[rid][cid]
        v2 = cellobj.value
        if(resultaddress != parentaddress){
            ParentChildrelation(resultaddress, rid, cid)
        }

    }

    v1 = Number(v1)
    v2 = Number(v2)
    if (op == '+') {
        operand.push((v1 + v2))
    } else if (op == '-') {
        operand.push(v2 - v1)
    } else if (op == '*') {
        operand.push(v1 * v2)
    } else if (op == '/') {
        operand.push(v2 / v1)
    }
}

function setUIformula(res, rid, cid) {
    document.querySelector(`.row > .col[rid="${rid}"][cid="${cid}"]`).innerText = res
    let formcellobj = sheetdB[rid][cid]
    formcellobj.value = res
    

}

function ParentChildrelation(resultaddress, parentRid, parentCid){
    cellobj = sheetdB[parentRid][parentCid]
    cellobj.children.push(resultaddress)
} 

function UpdateChildrenValue(changedvalAddress){
    try{
        let {cid, rid} = getRIdCIdfromAddress(changedvalAddress)
        changedcellObj = sheetdB[rid][cid]
        let children = changedcellObj.children
        for(let i = 0; i < children.length; i++){
            let {cid, rid} = getRIdCIdfromAddress(children[i])
            childrencellobj = sheetdB[rid][cid]
            let formula = childrencellobj.formula
            let result = solve(formula, children[i], childrencellobj.parent)
            childrencellobj.value = result
            setUIformula(result, rid,cid)
            UpdateChildrenValue(children[i])
        }
    }catch(e) {
        console.log("error")
    }
    
}

