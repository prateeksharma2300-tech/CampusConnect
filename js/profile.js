const form = document.getElementById("profileForm");
const card = document.getElementById("profileCard");

function toList(text) {
  return text.split(",").map(item => item.trim()).filter(item => item !== "");
}

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function showProfile() {
  const saved = JSON.parse(localStorage.getItem("profile"));

  if (!saved) {
    card.innerHTML = "<p>No profile saved yet. Fill in the form and click Save Profile.</p>";
    return;
  }

  const skillTags = saved.skills.map(s => `<span class="tag">${escapeHTML(s)}</span>`).join(" ");
  const projectTags = saved.projects.map(p => `<li>${escapeHTML(p)}</li>`).join("");

  card.innerHTML = `
    <div class="avatar">${escapeHTML(saved.name.charAt(0).toUpperCase())}</div>
    <h2>${escapeHTML(saved.name)}</h2>
    <p>${escapeHTML(saved.course)} · Semester ${escapeHTML(saved.semester)}</p>
    <p>${escapeHTML(saved.college)}</p>
    <h3>Skills</h3>
    <p>${skillTags || "None added"}</p>
    <h3>Projects</h3>
    <ul class="project-list">${projectTags || "<li>None added</li>"}</ul>
  `;
}

function fillForm() {
  const saved = JSON.parse(localStorage.getItem("profile"));
  if (!saved) return;
  document.getElementById("name").value = saved.name;
  document.getElementById("college").value = saved.college;
  document.getElementById("course").value = saved.course;
  document.getElementById("semester").value = saved.semester;
  document.getElementById("skills").value = saved.skills.join(", ");
  document.getElementById("projects").value = saved.projects.join(", ");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const profile = {
    name: document.getElementById("name").value.trim(),
    college: document.getElementById("college").value.trim(),
    course: document.getElementById("course").value.trim(),
    semester: document.getElementById("semester").value,
    skills: toList(document.getElementById("skills").value),
    projects: toList(document.getElementById("projects").value)
  };

  if (profile.name === "") {
    alert("Please enter your name.");
    return;
  }

  localStorage.setItem("profile", JSON.stringify(profile));
  showProfile();
});

document.getElementById("clearProfile").addEventListener("click", () => {
  localStorage.removeItem("profile");
  form.reset();
  showProfile();
});

fillForm();
showProfile();