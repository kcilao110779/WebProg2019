
function createNewItem(){
    // create html tags
    const list = document.createElement("li");
    const div = document.createElement("div");
    const input = document.createElement("input");
    const label = document.createElement("label");
    const h1 = document.createElement("h1");
    const img = document.createElement("img");
    
    // assign html attributes
    list.setAttribute("class", "todo-app__item");
    div.setAttribute("class", "todo-app__checkbox");
    // div.setAttribute("onclick","line_through(this)");
    input.setAttribute("id", id);
    input.setAttribute("type","checkbox");
    input.setAttribute("onclick","completed(this)");
    input.setAttribute("value","0");
    label.setAttribute("for",id);

    h1_text = document.getElementById("todo-input").value;;
    h1.setAttribute("class","todo-app__item-detail");
    h1.innerText = h1_text;;
    img.setAttribute("class", "todo-app__item-x");
    img.setAttribute("src", "./img/x.png");
    // img.setAttribute("id",id);
    img.setAttribute("onclick", "remove(this)");

    // create tree
    list.appendChild(div);
    list.appendChild(h1);
    list.appendChild(img);
    div.appendChild(input);
    div.appendChild(label);
    document.getElementById("todo-list").appendChild(list);
}

var input = document.getElementById("todo-input");
var id = 1;
var itemCount = 1;
input.addEventListener('keyup', event => {
    if (event.keyCode === 13 && event.target.value !== ''){
        const newItem = createNewItem();
        input.value = ''; // flush the input text
        id++;
        itemCount++;
        leftnum();
    }
});

var allList = document.getElementById("todo-list");
function remove(thisNode){
    let removed_li = thisNode.parentNode;
    var check_completed_div = thisNode.previousElementSibling.previousElementSibling;
    var check_completed = check_completed_div.firstElementChild;
    if (check_completed.attributes["value"].value ==="0"){
        itemCount--;
    }

    allList.removeChild(removed_li);
    // 如果是已completed的remove後itemCount不能減一
    leftnum();
}

var complete_count = 0;
var left_count = 1;
function completed(thisNode){
    let lineThrough_div = thisNode.parentNode;
    let lineThrough_h1 = lineThrough_div.nextElementSibling;
//  if (checked === false){
    var checked = thisNode.attributes["value"].value;
    if (checked === "0"){
        lineThrough_h1.style["textDecoration"] = "line-through";
        lineThrough_h1.style["opacity"] = 0.5;
        thisNode.setAttribute("value","1");
        complete_count ++;
    }
    else{
        lineThrough_h1.style["textDecoration"] = "none";
        lineThrough_h1.style["opacity"] = 1;
        thisNode.setAttribute("value","0");
        complete_count --;
    }
    leftnum();
}

function leftnum(){
    left_count = itemCount - complete_count;
    console.log(left_count);
    document.getElementById("todo-total").textContent =  left_count + "  left";
    console.log(document.getElementById("todo-total").textContent);
}





