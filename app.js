// load saved tasks from local storage
const tasks = JSON.parse(localStorage.getItem("taskList"));
//const tasks = [];
const input = document.getElementById("addTodoInput");
const listElement = document.getElementsByClassName("to-do-list");
const submitBtn = document.getElementById("submit-btn");
const selectBtns = document.querySelectorAll("#selector button");

loadElements();

// Functions
function loadElements() {
  let savedTasks = JSON.parse(localStorage.getItem("taskList"));
  if (savedTasks !== null) {
    for (let i = 0; i < savedTasks.length; i++) {
      const userText = savedTasks[i].name;
      // create all elements
      const newDivListContainer = document.createElement("div");
      const newLI = document.createElement("li");
      const newDivBtnContainer = document.createElement("div");
      const newCheckBtn = document.createElement("button");
      const newDeleteBtn = document.createElement("button");

      // add classes
      newDivListContainer.classList.add("to-do-list-item-container");
      newDivBtnContainer.classList.add("btn-container");
      newCheckBtn.classList.add("complete-btn");
      newDeleteBtn.classList.add("delete-btn");
      newLI.classList.add(savedTasks[i].class);

      // add content:
      newLI.innerText = `${userText}`;
      newCheckBtn.innerText = "Complete";
      newDeleteBtn.innerText = "Delete";

      // append children
      newDivListContainer.appendChild(newLI);
      newDivListContainer.appendChild(newDivBtnContainer);
      newDivBtnContainer.appendChild(newCheckBtn);
      newDivBtnContainer.appendChild(newDeleteBtn);

      // append new element to the lu
      listElement[0].appendChild(newDivListContainer);
    }
  }
}

function createElement() {
  const userText = input.value;
  // create all elements
  const newDivListContainer = document.createElement("div");
  const newLI = document.createElement("li");
  const newDivBtnContainer = document.createElement("div");
  const newCheckBtn = document.createElement("button");
  const newDeleteBtn = document.createElement("button");

  // add classes
  newDivListContainer.classList.add("to-do-list-item-container");
  newDivBtnContainer.classList.add("btn-container");
  newCheckBtn.classList.add("complete-btn");
  newDeleteBtn.classList.add("delete-btn");
  newLI.classList.add("outstanding");

  // add content:
  newLI.innerText = `${userText}`;
  newCheckBtn.innerText = "Complete";
  newDeleteBtn.innerText = "Delete";

  // append children
  newDivListContainer.appendChild(newLI);
  newDivListContainer.appendChild(newDivBtnContainer);
  newDivBtnContainer.appendChild(newCheckBtn);
  newDivBtnContainer.appendChild(newDeleteBtn);

  // append new element to the lu
  listElement[0].appendChild(newDivListContainer);

  input.value = "";

  const newTask = {};
  newTask.name = userText;
  newTask.class = newLI.classList.value;

  tasks.push(newTask);
  localStorage.setItem("taskList", JSON.stringify(tasks));
}

function completeTask(e) {
  if (e.target.classList.contains("complete-btn")) {
    const targetLI = e.target.parentElement.parentElement.querySelector("li");
    targetLI.classList.toggle("completed");
    targetLI.classList.toggle("outstanding");

    for (i = 0; i < tasks.length; i++) {
      if (tasks[i].name === targetLI.innerText) {
        //update class:
        if (targetLI.classList.contains("completed")) {
          tasks[i].class = "completed";
          console.log(tasks[i].class);
        } else {
          tasks[i].class = "outstanding";
        }

        //update stored array
        localStorage.setItem("taskList", JSON.stringify(tasks));
      }
    }

    // name: LI.innerText, class: LI.classList

    //change value of object.class in storage
  }
}

function changeDisplay(e) {
  let LIs = document.querySelectorAll("li");

  switch (e.target.id) {
    case "completed-tasks":
      console.log(e.target.id);
      for (let i = 0; i < LIs.length; i++) {
        if (!LIs[i].classList.contains("completed")) {
          LIs[i].parentElement.style.display = "none";
        } else {
          LIs[i].parentElement.style.display = "flex";
        }
      }
      break;
    case "outstanding-tasks":
      for (let i = 0; i < LIs.length; i++) {
        if (!LIs[i].classList.contains("completed")) {
          LIs[i].parentElement.style.display = "flex";
        } else {
          LIs[i].parentElement.style.display = "none";
        }
      }
      break;
    case "all-tasks":
      for (let i = 0; i < LIs.length; i++) {
        LIs[i].parentElement.style.display = "flex";
      }
  }
}

function removeElement(e) {
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.parentElement.remove();

    let toRemoveLi =
      e.target.parentElement.parentElement.querySelector("li").innerText;
    const index = tasks.indexOf(toRemoveLi);
    tasks.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(tasks));
  }
}

// Listeners

// add task:
submitBtn.addEventListener("click", createElement);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    createElement();
  }
});

// select all, completed, outstanding
for (let j = 0; j < selectBtns.length; j++) {
  selectBtns[j].addEventListener("click", changeDisplay);
}

// complete or delete task
document.addEventListener("click", completeTask);
document.addEventListener("click", removeElement);
