document.addEventListener("DOMContentLoaded", function () {
  const userInput = document.querySelector(".input-field");
  const userBtn = document.querySelector(".input-btn");
  const container = document.querySelector(".container");
  const output = document.querySelector(".output");
  const clear = document.querySelector(".clear");
  let isClearButtonAdded = false;
  let clearBtn = undefined;
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTask(task));

  function renderTask(task) {
    const taskBox = document.createElement("div");
    taskBox.classList.add("out");

    const taskPara = document.createElement("p");
    taskPara.textContent = task;
    taskPara.classList.add("taskPara");
    taskBox.appendChild(taskPara);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-task");
    taskBox.appendChild(deleteBtn);

    output.appendChild(taskBox);

    deleteBtn.addEventListener("click", function () {
      output.removeChild(taskBox);
      tasks = tasks.filter(t => t !== task);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      if (output.children.length === 0 && isClearButtonAdded) {
        clear.removeChild(clearBtn);
        isClearButtonAdded = false;
      }
    });

    if (!isClearButtonAdded) {
      addClearButton();
      isClearButtonAdded = true;
    }
  }

  function addingTask(task) {
    if (task.trim() === "") return;
    if (tasks.includes(task.toLowerCase())) {
      alert("Task already exists!");
      return;
    }

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTask(task);
    userInput.value = "";
  }

  function addClearButton() {
    clearBtn = document.createElement("button");
    clearBtn.textContent = "Clear All";
    clearBtn.classList.add("clear-all");
    clear.appendChild(clearBtn);

    clearBtn.addEventListener("click", function () {
      localStorage.clear();
      tasks = [];
      output.innerHTML = "";
      clear.removeChild(clearBtn);
      isClearButtonAdded = false;
    });
  }

  function gettingInput() {
    addingTask(userInput.value.trim());
  }

  userBtn.addEventListener("click", gettingInput);
  userInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      gettingInput();
    }
  });
});
