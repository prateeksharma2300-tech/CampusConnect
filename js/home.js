/* ---------- Announcements (edit this list yourself) ---------- */
const announcements = [
  "Welcome to CampusConnect, a student resource hub.",
  "The SGPA and attendance calculators are live on the Tools page.",
  "New study resources are added to the Library regularly."
];

const announcementList = document.getElementById("announcementList");
announcements.forEach(text => {
  const li = document.createElement("li");
  li.textContent = text;
  announcementList.appendChild(li);
});

/* ---------- Exam countdown ---------- */
const examName = document.getElementById("examName");
const examDate = document.getElementById("examDate");
const examResult = document.getElementById("examResult");

function showExam() {
  const saved = JSON.parse(localStorage.getItem("exam"));
  if (!saved) {
    examResult.textContent = "No exam set.";
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const examDay = new Date(saved.date + "T00:00:00");
  const days = Math.round((examDay - today) / (1000 * 60 * 60 * 24));

  if (days > 0) {
    examResult.textContent = saved.name + ": " + days + " day(s) left";
  } else if (days === 0) {
    examResult.textContent = saved.name + " is today. Good luck!";
  } else {
    examResult.textContent = saved.name + " has already passed.";
  }
}

document.getElementById("saveExam").addEventListener("click", () => {
  const name = examName.value.trim() || "Exam";
  if (examDate.value === "") {
    alert("Please pick a date.");
    return;
  }
  localStorage.setItem("exam", JSON.stringify({ name, date: examDate.value }));
  examName.value = "";
  examDate.value = "";
  showExam();
});

showExam();

/* ---------- Pending tasks (from the Tools page to-do list) ---------- */
const homeTasks = document.getElementById("homeTasks");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const pending = tasks.filter(t => !t.done).slice(0, 5);

if (pending.length === 0) {
  const li = document.createElement("li");
  li.textContent = "No pending tasks. Add some on the Tools page.";
  homeTasks.appendChild(li);
} else {
  pending.forEach(t => {
    const li = document.createElement("li");
    li.textContent = "• " + t.text;
    homeTasks.appendChild(li);
  });
}