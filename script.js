let addButton = document.getElementById("add-button");
addButton.addEventListener("click", addToDoItem);

let clearCompleted = document.getElementById("clear-completed-button");
clearCompleted.addEventListener("click", clearCompletedToDoItems);

let emptyListBtn = document.getElementById("empty-button");
emptyListBtn.addEventListener("click", emptyList);

let saveListBtn = document.getElementById("save-button");
saveListBtn.addEventListener("click", saveList);

// function addToDoItem() {
//     alert("Add button clicked!");
// }

function addToDoItem() {
    let toDoEntryBox = document.getElementById("todo-entry-box");
    let itemText = toDoEntryBox.value;
    newToDoItem(itemText, false);
}

var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");

function newToDoItem(itemText, completed) {
    let toDoItem = document.createElement("li");
    let toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);

    if (completed) {
        toDoItem.classList.add("completed");
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
}

function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
}

function clearCompletedToDoItems() {
    let completedItems = toDoList.getElementsByClassName("completed");

    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
}

function emptyList() {
    let toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
}

function saveList() {
    let toDos = [];

    for (let i = 0; i < toDoList.children.length; i++) {
        let toDo = toDoList.children.item(i);

        let toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoInfo);

    }
    
    localStorage.setItem("toDos", JSON.stringify(toDos));
    console.log(localStorage);
}

function loadList() {
    if (localStorage.getItem("toDos") != null) {
        let toDos = JSON.parse(localStorage.getItem("toDos"));

        for (let i = 0; i < toDos.length; i++) {
            let toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}

loadList();

// let myArray = [];
// myArray.push("something to store");
// myArray.push("something else to store");
// alert(myArray[0]);
// //This will alert "something to store"

let toDoInfo = {
    "task": "Thing I need to do",
    "completed": false
};

function enterKeyPressed(event) {
    console.log("a key is pressed: ", event.keyCode);
    if (event.keyCode == 13) {
        console.log("ENTER key is pressed: ", event.keyCode);
        addToDoItem();
    }
}

