document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initProjects();
    initModalHandlers();
    initScrollHandler();
});

// ------------------------------
// PROJECT LOADING
// ------------------------------
async function initProjects() {
    const grid = document.getElementById("projectsGrid");

    if (!grid) return;

    try {
        const response = await fetch("./assets/projects.json");

        if (!response.ok) {
            throw new Error(`HTTP ${response.status} - Failed to load projects.json`);
        }

        const projects = await response.json();

        if (!Array.isArray(projects)) {
            throw new Error("projects.json must contain an array");
        }

        loadProjects(projects);
    } catch (error) {
        console.error("Error loading projects.json:", error);
        grid.innerHTML = `<p class="error-message">Unable to load projects right now.</p>`;
    }
}

function loadProjects(projects) {
    const grid = document.getElementById("projectsGrid");
    if (!grid) return;

    grid.innerHTML = "";

    projects.forEach((project) => {
        const card = document.createElement("div");
        card.className = "project";
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", `Open project details for ${project.title}`);

        const title = document.createElement("h3");
        title.textContent = project.title || "Untitled Project";

        const shortDesc = document.createElement("p");
        shortDesc.textContent = project.short || "";

        const techBadges = document.createElement("div");
        techBadges.className = "tech-badges";

        if (Array.isArray(project.tech)) {
            project.tech.forEach((tech) => {
                const badge = document.createElement("span");
                badge.textContent = tech;
                techBadges.appendChild(badge);
            });
        }

        card.appendChild(title);
        card.appendChild(shortDesc);
        card.appendChild(techBadges);

        const openHandler = () => {
            openProject(
                project.title || "Untitled Project",
                project.description || "No description available.",
                Array.isArray(project.tech) ? project.tech : [],
                project.link || "",
                project.linkText || "View Project"
            );
        };

        card.addEventListener("click", openHandler);
        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openHandler();
            }
        });

        grid.appendChild(card);
    });
}

// ------------------------------
// MODAL
// ------------------------------
function openProject(title, description, techArray, link, linkText) {
    const modal = document.getElementById("projectModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const techContainer = document.getElementById("modalTech");
    const modalLink = document.getElementById("modalLink");

    if (!modal || !modalTitle || !modalDescription || !techContainer || !modalLink) return;

    modalTitle.textContent = title;
    modalDescription.textContent = description;

    techContainer.innerHTML = "";

    techArray.forEach((tech) => {
        const span = document.createElement("span");
        span.textContent = tech;
        techContainer.appendChild(span);
    });

    if (link) {
        modalLink.innerHTML = `
            <a href="${link}" target="_blank" rel="noopener noreferrer">
                ${linkText || "View Project"}
            </a>
        `;
        modalLink.style.display = "block";
    } else {
        modalLink.innerHTML = "";
        modalLink.style.display = "none";
    }

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeModal() {
    const modal = document.getElementById("projectModal");
    if (!modal) return;

    modal.style.display = "none";
    document.body.style.overflow = "";
}

function initModalHandlers() {
    const modal = document.getElementById("projectModal");

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });
}

// ------------------------------
// THEME
// ------------------------------
function toggleMode() {
    document.body.classList.toggle("light-mode");

    const isLightMode = document.body.classList.contains("light-mode");
    localStorage.setItem("theme", isLightMode ? "light" : "dark");
}

function initTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }
}

// ------------------------------
// BACK TO TOP
// ------------------------------
function initScrollHandler() {
    const topBtn = document.getElementById("topBtn");
    if (!topBtn) return;

    window.addEventListener("scroll", () => {
        topBtn.style.display = window.scrollY > 80 ? "block" : "none";
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}