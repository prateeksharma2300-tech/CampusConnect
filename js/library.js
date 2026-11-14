const resources = [
  { title: "C Programming Tutorial", subject: "C Programming", semester: 1,
    description: "Beginner-friendly C lessons with examples.",
    link: "https://www.w3schools.com/c/" },
  { title: "C Programming Language Guide", subject: "C Programming", semester: 1,
    description: "Topic-wise C concepts and practice problems.",
    link: "https://www.geeksforgeeks.org/c-programming-language/" },
  { title: "HTML, CSS and JavaScript Basics", subject: "Web Development", semester: 1,
    description: "Free interactive web development course.",
    link: "https://www.freecodecamp.org/" },
  { title: "MDN Web Docs", subject: "Web Development", semester: 1,
    description: "The best reference for HTML, CSS and JavaScript.",
    link: "https://developer.mozilla.org/" },
  { title: "Khan Academy Calculus", subject: "Mathematics", semester: 1,
    description: "Video lessons and practice for calculus.",
    link: "https://www.khanacademy.org/math/calculus-1" },
  { title: "Khan Academy Linear Algebra", subject: "Mathematics", semester: 2,
    description: "Matrices, vectors and linear equations.",
    link: "https://www.khanacademy.org/math/linear-algebra" }
];

const grid = document.getElementById("resourceGrid");
const searchBox = document.getElementById("searchBox");
const subjectFilter = document.getElementById("subjectFilter");
const noResults = document.getElementById("noResults");

function showResources() {
  const searchText = searchBox.value.toLowerCase();
  const subject = subjectFilter.value;

  const filtered = resources.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchText) ||
      item.description.toLowerCase().includes(searchText);
    const matchesSubject = subject === "All" || item.subject === subject;
    return matchesSearch && matchesSubject;
  });

  grid.innerHTML = "";

  filtered.forEach(item => {
    grid.innerHTML += `
      <div class="card">
        <span class="tag">${item.subject} · Sem ${item.semester}</span>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <a href="${item.link}" target="_blank" class="btn small">Open</a>
      </div>
    `;
  });

  noResults.classList.toggle("hidden", filtered.length > 0);
}

searchBox.addEventListener("input", showResources);
subjectFilter.addEventListener("change", showResources);

showResources();