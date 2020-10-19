console.log("JS is loaded");

var items = [];
var count =0;

function removeItem(id){
    var itemsHtml = document.getElementById("items");
    var item = document.getElementById(id);
    itemsHtml.removeChild(item);
    var itemText = item.textContent.substring(0,item.textContent.length-7);
    items = items.filter(i => i != itemText);
}

function addItem(){
    var item = document.getElementById("itemInput");
    items.push(item.value);
    var itemsHtml = document.getElementById("items");
    var listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(item.value + " "));
    var id = item.value + count;
    listItem.setAttribute('id',id);
    var removeButton = document.createElement('button');
    removeButton.className = "btn btn-danger btn-sm"
    removeButton.appendChild(document.createTextNode("Remove"));
    removeButton.addEventListener("click",() => removeItem(id));
    listItem.appendChild(removeButton);
    itemsHtml.appendChild(listItem);
    count++;
}

function downloadAsTxt(){
    var result = constructItems();
    var blob = new Blob([result],{type:"octet/stream"});
    var downloadUrl = window.URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = downloadUrl;
    link.download = "items.txt";
    link.click();
}


function constructItems(){
    var result = "";
    for(var i=0;i<items.length;i++){
        result = result + items[i] + "\n";
    }
    return result;
}

document.getElementById("addButton").addEventListener("click",addItem);
document.getElementById("downloadButton").addEventListener("click",downloadAsTxt);

