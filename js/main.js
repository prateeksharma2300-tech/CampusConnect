const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

/* ---------- Dark mode ---------- */
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

const themeItem = document.createElement("li");
const themeBtn = document.createElement("button");
themeBtn.className = "theme-btn";
themeBtn.setAttribute("aria-label", "Toggle dark mode");

function updateThemeIcon() {
  themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  updateThemeIcon();
});

themeItem.appendChild(themeBtn);
navLinks.appendChild(themeItem);
updateThemeIcon();