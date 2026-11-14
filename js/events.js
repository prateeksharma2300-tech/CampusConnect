const events = [
  { title: "Find Hackathons on Devfolio", category: "Hackathon",
    description: "Browse upcoming hackathons across India and apply with your team.",
    link: "https://devfolio.co/hackathons" },
  { title: "Competitions on Unstop", category: "Hackathon",
    description: "Coding contests, hackathons and quizzes for college students.",
    link: "https://unstop.com/" },
  { title: "Internships on Internshala", category: "Internship",
    description: "Search internships and training programs for students.",
    link: "https://internshala.com/" },
  { title: "National Scholarship Portal", category: "Scholarship",
    description: "Official Government of India portal for student scholarships.",
    link: "https://scholarships.gov.in/" },
  { title: "NPTEL Online Courses", category: "Free Course",
    description: "Free courses from IITs and IISc, with optional certification.",
    link: "https://nptel.ac.in/" },
  { title: "freeCodeCamp", category: "Free Course",
    description: "Learn web development, JavaScript and more for free.",
    link: "https://www.freecodecamp.org/" },
  { title: "Major League Hacking", category: "Hackathon",
    description: "Student hackathons and events, including online ones.",
    link: "https://mlh.io/" },
  { title: "Google Summer of Code", category: "Internship",
    description: "Open-source programme for contributors, for later years.",
    link: "https://summerofcode.withgoogle.com/" },
  { title: "Buddy4Study", category: "Scholarship",
    description: "Search scholarships you may be eligible for.",
    link: "https://www.buddy4study.com/" },
  { title: "SWAYAM", category: "Free Course",
    description: "Free online courses from Indian institutions.",
    link: "https://swayam.gov.in/" },
  { title: "Kaggle Learn", category: "Free Course",
    description: "Short free courses on Python, data and machine learning.",
    link: "https://www.kaggle.com/learn" }
];

const eventGrid = document.getElementById("eventGrid");
const eventSearch = document.getElementById("eventSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const noEvents = document.getElementById("noEvents");

let selectedCategory = "All";

function showEvents() {
  const searchText = eventSearch.value.toLowerCase();

  const filtered = events.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchText) ||
      item.description.toLowerCase().includes(searchText);
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  eventGrid.innerHTML = "";

  filtered.forEach(item => {
    eventGrid.innerHTML += `
      <div class="card">
        <span class="tag">${item.category}</span>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <a href="${item.link}" target="_blank" class="btn small">Visit</a>
      </div>
    `;
  });

  noEvents.classList.toggle("hidden", filtered.length > 0);
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    selectedCategory = button.dataset.category;
    showEvents();
  });
});

eventSearch.addEventListener("input", showEvents);

showEvents();