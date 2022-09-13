window.onload = function(){
    let table = document.getElementById("fruit_table");
    let row = table.rows;
    for (let i = 1; i < row.length - 1; i++) {
        let tr = row[i];
        trElement(tr);
    }
    // 添加事件
    let addTD = document.getElementById(`submitInput`);
    addTD.addEventListener("click",function () {
        addList(table,row.length);
    },false)
}
// tr事件
function trElement(tr){
    // 鼠标悬浮到表格某一行时
    tr.addEventListener("mouseenter", function (){
        mouseHover(tr);
    },false);
    // 鼠标离开表格某一行之后
    tr.addEventListener("mouseout",function (){
        mouseAway(tr);
    },false);
    // 获取td
    let column = tr.cells;
    let len = column.length
    for (let j = 1; j < len - 2; j++) {
        let td = column[j];
        // 鼠标点击表格某一格时
        td.addEventListener("click",function (){
            mouseClick(td);
        },true)
    }
    column[len-1].addEventListener("click",function () {
        // 鼠标点击最后一格时
        delTR(column[len-1].parentElement);
    },false)
}
// 向表格中添加数据
function addList(table,len){
    let name_input = document.getElementById("name_input");
    let unitPrice_input = document.getElementById("unitPrice_input");
    let amount_input = document.getElementById("amount_input");
    let tr = table.insertRow(len -1);
    // 添加单元格
    let name = tr.insertCell(0);
    name.innerText = name_input.value;
    name.className = "table_border"

    let unitPrice = tr.insertCell(1);
    unitPrice.innerText = unitPrice_input.value;
    unitPrice.className = "table_border"

    let amount = tr.insertCell(2);
    amount.innerText = amount_input.value;
    amount.className = "table_border"

    let subtotal = tr.insertCell(3);
    subtotal.innerText = parseInt(unitPrice.innerText) * parseInt(amount.innerText);
    subtotal.className = "table_border"

    let del = tr.insertCell(4);
    del.innerHTML = "<img src=\"img/del.png\">";
    del.className = "table_border";
    trElement(tr);
}
// 删除列表中一行
function delTR(tr){
    if(confirm("是否删除该库存记录？")){
        let table = document.getElementById("fruit_table");
        table.deleteRow(tr.rowIndex)
        updateTotal()
    }
}
// 鼠标点击某一个单元格时
function mouseClick(td){
    let value = td.innerText; // 获取td内部文本的信息
    if (td.firstChild.nodeType === 3){ // 当第一个节点是文本节点时
        td.innerHTML = "<input type='text' size='2'>"; // 将td的内容改为input标签
        let input = td.firstChild;
        if (input.tagName === "INPUT"){
            input.value = value;
            input.select(); // 直接进入input内部
            // 检查键盘的输入
            input.addEventListener("keydown",function () {
                keyCheck(input);
            })
            // 当输入框失去焦点时
            input.addEventListener("blur",function () {
                mouseBlur(input);
            },false)
        }
    }
}
// 检查键盘输入是否符合规范
function keyCheck(input){
    // let num = ["1","2","3","4","5","6","7","8","9"]
    if(event.keyCode === 13){
        mouseBlur(input)
    }
}
// 当鼠标失去焦点时
function mouseBlur(input){
    let newValue = input.value;
    let td = input.parentElement; // 获取input节点的父节点
    td.innerText = newValue; // 设置td中的值为输入的新数值
    updateData(td);
}
// 更新表格数据
function updateData(td){
    let tr = td.parentElement;
    let col = tr.cells;
    let unitPrice = col[1];
    let amount = col[2];
    let sum = parseInt(unitPrice.innerText) * parseInt(amount.innerText);
    if(sum > -1){
        col[3].innerText = sum;
    }
    updateTotal();
}
// 更新总计
function updateTotal(){
    let table = document.getElementById("fruit_table");
    let row = table.rows;
    let sum = 0;
    for (let i = 1; i < row.length-1; i++) {
       let tr = row[i];
       sum = sum + parseInt(tr.cells[3].innerText);
    }
    if (sum > -1){
        row[row.length-1].cells[1].innerText = sum;
    }
}
// 鼠标离开表格中某一行时触发
function mouseAway(tr){
    tr.style.backgroundColor = "lemonchiffon";
}
// 鼠标悬浮在表格中某一行时触发
function mouseHover(tr){
    tr.style.backgroundColor = "cornflowerblue";
}