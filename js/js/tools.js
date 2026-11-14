/* ---------- SGPA Calculator ---------- */
let subjects = [];

const subjectList = document.getElementById("subjectList");
const sgpaResult = document.getElementById("sgpaResult");

function showSubjects() {
  subjectList.innerHTML = "";
  subjects.forEach(s => {
    subjectList.innerHTML += `<li>${s.credits} credits, grade ${s.gradePoints}</li>`;
  });

  let totalCredits = 0;
  let totalPoints = 0;
  subjects.forEach(s => {
    totalCredits += s.credits;
    totalPoints += s.credits * s.gradePoints;
  });

  if (totalCredits > 0) {
    sgpaResult.textContent = "SGPA: " + (totalPoints / totalCredits).toFixed(2);
  } else {
    sgpaResult.textContent = "SGPA: -";
  }
}

document.getElementById("addSubject").addEventListener("click", () => {
  const credits = parseFloat(document.getElementById("credits").value);
  const gradePoints = parseFloat(document.getElementById("gradePoints").value);

  if (isNaN(credits) || isNaN(gradePoints) || credits <= 0 || gradePoints < 0 || gradePoints > 10) {
    alert("Enter valid credits and grade points (0-10).");
    return;
  }

  subjects.push({ credits, gradePoints });
  document.getElementById("credits").value = "";
  document.getElementById("gradePoints").value = "";
  showSubjects();
});

document.getElementById("clearSubjects").addEventListener("click", () => {
  subjects = [];
  showSubjects();
});

/* ---------- Attendance Calculator ---------- */
document.getElementById("checkAttendance").addEventListener("click", () => {
  const total = parseInt(document.getElementById("totalClasses").value);
  const attended = parseInt(document.getElementById("attendedClasses").value);
  const result = document.getElementById("attendanceResult");

  if (isNaN(total) || isNaN(attended) || total <= 0 || attended < 0 || attended > total) {
    result.textContent = "Enter valid numbers.";
    return;
  }

  const percent = (attended / total) * 100;
  let message = "Attendance: " + percent.toFixed(1) + "%. ";

  if (percent >= 75) {
    // classes you can still miss while staying at 75%
    const canMiss = Math.floor(attended / 0.75 - total);
    message += "You can miss " + canMiss + " more class(es) and stay at 75%.";
  } else {
    // classes you must attend in a row to reach 75%
    const need = Math.ceil((0.75 * total - attended) / 0.25);
    message += "Attend the next " + need + " class(es) to reach 75%.";
  }

  result.textContent = message;
});

/* ---------- To-Do List (saved in localStorage) ---------- */
const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.done) li.classList.add("done");

    li.addEventListener("click", () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      showTasks();
    });

    const del = document.createElement("button");
    del.textContent = "✕";
    del.className = "delete-btn";
    del.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      showTasks();
    });

    li.appendChild(del);
    taskList.appendChild(li);
  });
}

document.getElementById("addTask").addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return;
  tasks.push({ text, done: false });
  taskInput.value = "";
  saveTasks();
  showTasks();
});

showTasks();
showSubjects();