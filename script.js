fetch("./projects.json")
    .then(response => response.json())
    .then(projects => loadProjects(projects))
    .catch(err => console.error("Error loading projects.json:", err));

function loadProjects(projects) {
    const grid = document.getElementById("projectsGrid");
    grid.innerHTML = "";

    projects.forEach(project => {
        const card = document.createElement("div");
        card.className = "project";
        card.onclick = () => openProject(project.title, project.description, project.tech);

        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.short}</p>
            <div class="tech-badges">
                ${project.tech.map(t => `<span>${t}</span>`).join("")}
            </div>
        `;

        grid.appendChild(card);
    });
}

// OPEN PROJECT MODAL
function openProject(title, description, techArray, link, linkText) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalDescription").innerText = description;

    let techContainer = document.getElementById("modalTech");
    techContainer.innerHTML = ""; 
    techArray.forEach(t => {
        let span = document.createElement("span");
        span.innerText = t;
        techContainer.appendChild(span);
    });

    // Show link if available
    const modalLink = document.getElementById("modalLink");
    if (link) {
        modalLink.innerHTML = `<a href="${link}" target="_blank">${linkText}</a>`;
        modalLink.style.display = "block";
    } else {
        modalLink.style.display = "none";
    }

    document.getElementById("projectModal").style.display = "block";
}

// CLOSE MODAL
function closeModal() {
    document.getElementById("projectModal").style.display = "none";
}

// CLOSE IF CLICK OUTSIDE
window.onclick = function(event) {
    let modal = document.getElementById("projectModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Dark Mode Toggle
function toggleMode() {
    document.body.classList.toggle("light-mode");
}

// Back to Top Button
let topBtn = document.getElementById("topBtn");

window.onscroll = function () {
    if (document.documentElement.scrollTop > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
