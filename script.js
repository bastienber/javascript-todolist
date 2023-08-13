const inputElt = document.querySelector("#text")
const addBtn = document.querySelector("#addElement")
const listElt = document.querySelector("ul")

let deleteElts = document.querySelectorAll(".deleteButton");
let checkboxElts = document.querySelectorAll(".checkbox");
let elementToDoElts = document.querySelectorAll(".elementToDo");

const templateUnchecked = document.querySelector("#templateUnchecked");
const templateChecked = document.querySelector("#templateChecked");


let list = JSON.parse(window.localStorage.getItem('list')) || [];

//creating the list with the local storage informations
if (list.length > 0) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].checked === true) {
            const cloneChecked = templateChecked.content.cloneNode(true);
            listElt.appendChild(cloneChecked);

        }
        else {
            const cloneUnchecked = templateUnchecked.content.cloneNode(true);
            listElt.appendChild(cloneUnchecked);
        }
        document.querySelectorAll(".elementToDo")[i].innerHTML = list[i].value;
    }
    for (let i = 0; i < document.querySelectorAll(".checked").length; i++) {
        document.querySelectorAll(".checked")[i].checked = true;
    }
}
setup();

//creating a new item in the list
addBtn.addEventListener("click", function() {
    const cloneUnchecked = templateUnchecked.content.cloneNode(true);
    inputElt.value = inputElt.value.trim();

    if (inputElt.value !== "") {

        listElt.appendChild(cloneUnchecked);;
        listElt.lastElementChild.lastElementChild.previousElementSibling.innerHTML = inputElt.value;

        inputElt.value = "";
        setup();
        setItemToStorage();
    }

})

//creating event for each item on the list
function setup() {
    deleteElts = document.querySelectorAll(".deleteButton");
    checkboxElts = document.querySelectorAll(".checkbox");
    elementToDoElts = document.querySelectorAll(".elementToDo");

    for (let i = 0; i < checkboxElts.length; i++) {
        checkboxElts[i].removeEventListener("click", setItemToStorage);
        checkboxElts[i].addEventListener("click", setItemToStorage);
    }

    for (let i = 0; i < deleteElts.length; i++) {
        deleteElts[i].removeEventListener("click", deleting);
        deleteElts[i].addEventListener("click", deleting);
    }
}

//deleting an item of the list
function deleting() {
    event.target.parentNode.remove();
    setItemToStorage();
}

//updating local storage
function setItemToStorage() {
    checkboxElts = document.querySelectorAll(".checkbox");
    elementToDoElts = document.querySelectorAll(".elementToDo");

    list.splice(0, list.length);

    for (let i = 0; i < elementToDoElts.length; i++) {
        list.push({
            value: elementToDoElts[i].innerHTML,
            checked: checkboxElts[i].checked
        })

    }
    window.localStorage.setItem("list", JSON.stringify(list));
}
