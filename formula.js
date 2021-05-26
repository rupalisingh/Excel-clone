
formula.addEventListener("keydown", function (e) {
    let cellobj = sheetdB[0][0]
    if (e.key == "Enter" && formula.value != "") {
        cellobj.formula = formula.value
        let exp = formula.value
        let res = solve(exp)
        let resultaddress = addressBar.value
        let {cid, rid} = getRIdCIdfromAddress(resultaddress)
        setUIformula(res, rid, cid)
    }


})



function solve(exp) {
    let operand = []
    let operator = []
    for (let i = 0; i < exp.length; i++) {
        let ch = exp.charAt(i)
        if (ch == '(' || ch == '+' || ch == '-' || ch == '*' || ch == '/') {
            operator.push(ch)
        }
        else if (ch == ')') {
            let op = operator.pop()
            evaluate(op, operand)
        } else {
            if (ch != " ") {
                operand.push(ch)
            }
        }
    }

    while (operand.length > 1) {
        let remop = operator.pop()
        evaluate(remop, operand)
    }

    return operand.pop()
}

function evaluate(op, operand) {
    let v1 = operand.pop()
    let v2 = operand.pop()
    let v3 = operand.pop()
    let v4 = operand.pop()
    v2 = v2 + v1
    v4 = v4 + v3
    let { cid, rid } = getRIdCIdfromAddress(v2)
    let cellobj1 = sheetdB[rid][cid]
    v1 = Number(cellobj1.value)
    let res = getRIdCIdfromAddress(v4)
    rid = res.rid
    cid = res.cid
    let cellobj2 = sheetdB[rid][cid]
    v2 = Number(cellobj2.value)
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


function setUIformula(res, rid, cid){
    document.querySelector(`.row > .col[rid="${rid}"][cid="${cid}"]`).innerText = res
    let formcellobj = sheetdB[rid][cid]
    formcellobj.value = res
    
}