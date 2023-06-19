// VARIABLES:
const tasks = JSON.parse(localStorage.getItem("taskList"));
const input = document.getElementById("addTodoInput");
const listElement = document.getElementsByClassName("to-do-list");
const submitBtn = document.getElementById("submit-btn");
const selectBtns = document.querySelectorAll("#selector button");

loadSavedTasks();

// FUNCTIONS:

function loadSavedTasks() {
  if (tasks !== null) {
    // TODO: This is correct, but you probably have a foreach in javascript that will save you from having to address arrays by index. Smaller and clearer code is always nice to have, even if the enhance in appearance is very little. There is also a slight increase in performance, even if small enough to ignore for this case. Feel free to remove this comment without making any changes.
    for (let i = 0; i < tasks.length; i++) {
      createElement(tasks[i].name, tasks[i].class);
    }
  }
}

function createElement(userText, addedClass) {
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
  newLI.classList.add(addedClass);

  // add content:
  newLI.innerText = userText;
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

function createTask() {
  const taskName = `${input.value}`;
  createElement(taskName, "outstanding");
  // clear input field:
  input.value = "";
  // create an object to add to array that will be stored
  const newTask = {};
  newTask.name = taskName;
  newTask.class = "outstanding";
  // add object to array
  tasks.push(newTask);
  // update local storage with new array
  localStorage.setItem("taskList", JSON.stringify(tasks));
}

function completeTask(e) {
  // if statement required as event listener is on document.
  if (e.target.classList.contains("complete-btn")) {
    // toggle completed/outstanding class of li
    const targetLI = e.target.parentElement.parentElement.querySelector("li");
    targetLI.classList.toggle("completed");
    targetLI.classList.toggle("outstanding");

    // update the value of the class key of the object in local storage:
    for (i = 0; i < tasks.length; i++) {
      // if the task description is the same as object name value in storage
      if (tasks[i].name === targetLI.innerText) {
        //update class value of the object:
        if (targetLI.classList.contains("completed")) {
          tasks[i].class = "completed";
          console.log(tasks[i].class);
        } else {
          tasks[i].class = "outstanding";
        }
        //update array in local storage
        localStorage.setItem("taskList", JSON.stringify(tasks));
      }
    }
  }
}

function changeDisplay(e) {
  // get a list of all <li>s
  let LIs = document.querySelectorAll("li");
  // different actions depending on which btn clicked on:
  switch (e.target.id) {
    case "completed-tasks":
      for (let i = 0; i < LIs.length; i++) {
        if (LIs[i].classList.contains("outstanding")) {
          // hide outstanding tasks
          LIs[i].parentElement.style.display = "none";
        } else {
          LIs[i].parentElement.style.display = "flex";
        }
      }
      break;
    case "outstanding-tasks":
      for (let i = 0; i < LIs.length; i++) {
        if (LIs[i].classList.contains("outstanding")) {
          LIs[i].parentElement.style.display = "flex";
        } else {
          LIs[i].parentElement.style.display = "none";
          // hide completed tasks
        }
      }
      break;
    case "all-tasks":
      for (let i = 0; i < LIs.length; i++) {
        LIs[i].parentElement.style.display = "flex";
        // show all tasks
      }
  }
}

function removeElement(e) {
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.parentElement.remove();
    // find the index of item to remove
    let toRemoveLi =
      e.target.parentElement.parentElement.querySelector("li").innerText;
    for (i = 0; i < tasks.length; i++) {
      if (tasks[i].name === toRemoveLi) {
        tasks.splice(i, 1);
        localStorage.setItem("taskList", JSON.stringify(tasks));
      }
    }
  }
}

// EVENT LISTENERS:

// add task btn / Enter
submitBtn.addEventListener("click", createTask);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    createTask();
  }
});

// select All, Completed, Outstanding
for (let j = 0; j < selectBtns.length; j++) {
  selectBtns[j].addEventListener("click", changeDisplay);
}

// complete or delete task
document.addEventListener("click", completeTask);
document.addEventListener("click", removeElement);
