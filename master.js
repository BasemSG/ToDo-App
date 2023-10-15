let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let delAll = document.querySelector(".all");
let arrayOfTasks = [];

if (window.localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
}

getElementsFromLocal();

if (arrayOfTasks.length > 0) {
  delAll.style.display = "block";
} else {
  delAll.style.display = "none";
}

submit.addEventListener("click", () => {
  if (input.value != "") {
    addElementsToArray(input.value);
    input.value = "";
    if (arrayOfTasks.length > 0) {
      delAll.style.display = "block";
    } else {
      delAll.style.display = "none";
    }
  } else {
    alert("Enter A Task");
  }
});

tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
    deleteElementFromLocal(e.target.parentElement.getAttribute("data-id"));
    if (arrayOfTasks.length <= 0) {
      delAll.style.display = "none";
    }
  }
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");
    changeComplete(e.target.getAttribute("data-id"));
  }
});

function addElementsToArray(taskText) {
  let task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push(task);
  addElementsToPage(arrayOfTasks);
  addElementsToLocal(arrayOfTasks);
}

function addElementsToPage(arrayOfTasks) {
  tasksDiv.textContent = "";
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.setAttribute("data-id", task.id);
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasksDiv.appendChild(div);
  });
}

function addElementsToLocal(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getElementsFromLocal() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    arrayOfTasks = JSON.parse(data);
    addElementsToPage(arrayOfTasks);
  }
}

function deleteElementFromLocal(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addElementsToLocal(arrayOfTasks);
}

function changeComplete(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addElementsToLocal(arrayOfTasks);
}

delAll.addEventListener("click", deleteAllTasks);
function deleteAllTasks() {
  tasksDiv.textContent = "";
  window.localStorage.removeItem("tasks");
  delAll.style.display = "none";
}
