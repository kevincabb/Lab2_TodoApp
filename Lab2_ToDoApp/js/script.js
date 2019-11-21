//--------Global variables----//
let newListObj = [];
let listPosition = 0;
let toDoPosition = 0;
let ENTER_KEY = 13;


// Disable to do addition on load up
document.getElementById('myInput').disabled = true;
document.getElementById('addBtn2').disabled = true;

// If items stored in localStorage
if (localStorage.getItem('myObj') != '') {
    newListObj = JSON.parse(localStorage.getItem('myObj'));
    console.log(newListObj);

    for (let i = 0; i < newListObj.length; i++) {
        let myLName = document.getElementById('myLName');
        let aTag = document.createElement("a");
        let t = document.createTextNode(newListObj[i].title);
        aTag.className = "dropdown-item";
        aTag.appendChild(t);
        aTag.setAttribute('id', i);

        myLName.appendChild(aTag);
    }
}

// populate the correct list items when selecting a list name from drop down
let dropdownItem = document.getElementsByClassName('dropdown-item');
generateDropDown();

function generateDropDown() {
    // Depending on which list gets clicked on, it will generate the specific list
    for (let d = 0; d < dropdownItem.length; d++) {
        dropdownItem[d].addEventListener('click', function (ev) {
            let myUL = document.getElementById('myUL');
            let listName = document.getElementById('listName');
            let arrPosition = parseInt(dropdownItem[d].id);
            let toDos = newListObj[arrPosition].toDos;
            listName.value = newListObj[arrPosition].title;
            listPosition = arrPosition;

            // Clear field before showing list
            anakin(myUL);

            // re-create li elements for each to-do item
            for (let l = 0; l < toDos.length; l++) {
                let li = document.createElement("li");
                let listText = toDos[l];
                let t = document.createTextNode(listText);
                li.appendChild(t);
                myUL.appendChild(li);

                let span = document.createElement("SPAN");
                let txt = document.createTextNode("\u00D7");
                span.className = "close";
                span.appendChild(txt);
                li.appendChild(span);
            }

            // re-creates close icon
            for (a = 0; a < close.length; a++) {
                close[a].addEventListener('click', function (ev) {
                    let div = this.parentElement;
                    div.style.display = "none";
                    liText = div.innerText.substring(0, div.innerText.length - 1);
                    valuePosition = newListObj[listPosition].toDos;

                    for (k = 0; k < valuePosition.length; k++) {
                        if (liText === valuePosition[k]) {
                            newListObj[listPosition].toDos.splice(k, 1);
                            console.log(newListObj);
                        }
                    }

                });
            }

            // disable/enable buttons
            document.getElementById("listName").disabled = true;
            document.getElementById("addBtn1").disabled = true;
            document.getElementById('myInput').disabled = false;
        });
    }
}


// Create a "close" button and append it to each list item
let myNodelist = document.getElementsByTagName("LI");
let i;
for (i = 0; i < myNodelist.length; i++) {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}


// Click on a close button to hide the current list item
let close = document.getElementsByClassName("close");
/*for (i = 0; i < close.length; i++) {
    close[i].addEventListener('click', function (ev) {
        let div = this.parentElement;
        div.style.display = "none";
        alert('it works');
    });
}*/

// Add a "checked" symbol when clicking on a list item
let list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

// Create eventlistener for enter key event
let myInput = document.getElementById('myInput');
myInput.addEventListener('keypress', function (ev) {
    if (ev.keyCode === ENTER_KEY) {
        newElement();
    }
});

// Create a new list Name when clicking pn the 1st "Add" button
let addBtn1 = document.getElementById('addBtn1');
addBtn1.addEventListener('click', function (ev) {
    if (newListObj.length > 0) {
        listPosition = newListObj.length;
    } else {
        listPosition = 0;
    }
    let aTag = document.createElement("a");
    let listName = document.getElementById('listName').value;
    let t = document.createTextNode(listName);
    aTag.className = "dropdown-item";
    aTag.appendChild(t);
    aTag.setAttribute('id', listPosition);

    if (listName === '') {
        alert("You must write something!");
    }
    else {
        document.getElementById("myLName").appendChild(aTag);
        addBtn1.disabled = true;
        document.getElementById("listName").disabled = true;
        document.getElementById("addBtn1").disabled = true;
        document.getElementById('myInput').disabled = false;
        addBtn2.disabled = false;
    }

    listObj = {
        title: listName,
        toDos: []
    };

    newListObj.push(listObj);
});

// Create a new list item when clicking on the 2nd "Add" button
let addBtn2 = document.getElementById('addBtn2');
addBtn2.addEventListener('click', function (ev) {
    if (newListObj[listPosition].toDos.length > 0) {
        toDoPosition = newListObj[listPosition].toDos.length;
    } else {
        toDoPosition = 0;
    }

    let li = document.createElement("li");
    let inputValue = document.getElementById("myInput").value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);

    if (inputValue === '') {
        alert("You must write something!");
    }
    else {
        document.getElementById("myUL").appendChild(li);
    }

    newListObj[listPosition].toDos[toDoPosition] = inputValue;
    toDoPosition++;

    document.getElementById("myInput").value = "";

    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].addEventListener('click', function (ev) {
            let div = this.parentElement;
            div.style.display = "none";
            liText = div.innerText.substring(0, div.innerText.length - 1);
            valuePosition = newListObj[listPosition].toDos;

            for (k = 0; k < valuePosition.length; k++) {
                if (liText === valuePosition[k]) {
                    newListObj[listPosition].toDos.splice(k, 1);
                    console.log(newListObj);
                }
            }

        });
    }

    generateDropDown();
});

// clear list from JSON data
let clear = document.getElementById('clear');
let myUL = document.getElementById('myUL');
clear.addEventListener('click', function (ev) {
    localStorage.setItem('myObj', JSON.stringify(newListObj));
    newListObj = JSON.parse(localStorage.getItem('myObj'));
    newListObj.splice(0);

    anakin(myUL);
    document.getElementById('listName').value = "";
    document.getElementById("listName").disabled = false;
    document.getElementById("addBtn1").disabled = false;
    document.getElementById('myInput').disabled = true;

    let parent = document.getElementById('myLName');
    anakin(parent);

    console.log(newListObj);
});


// save list
let save = document.getElementById('save');
save.addEventListener('click', function (ev) {
    localStorage.setItem('myObj', JSON.stringify(newListObj));
    console.log(localStorage.getItem('myObj'));
});

// function to clear field
function anakin(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// re-set page for a new list
let newList = document.getElementById('newList');
newList.addEventListener('click', function (ev) {
    document.getElementById('listName').value = "";
    document.getElementById('listName').disabled = false;
    document.getElementById('addBtn1').disabled = false;
    document.getElementById('myInput').disabled = true;

    anakin(myUL);
});