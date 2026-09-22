// Automatically update the copyright year.
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// Mobile navigation.
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {

    navToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        navToggle.setAttribute("aria-expanded", isOpen);
        navToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });


    // Close mobile navigation after selecting a link.
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");

            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        });
    });


    // Close the menu with the Escape key.
    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            navLinks.classList.contains("open")
        ) {
            navLinks.classList.remove("open");

            navToggle.setAttribute("aria-expanded", "false");
            navToggle.focus();
        }
    });
}


// Subtle active navigation behavior based on scroll position.
const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window && sections.length > 0) {

    const observerOptions = {
        root: null,
        rootMargin: "-25% 0px -65% 0px",
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute("id");

                navigationLinks.forEach((link) => {
                    const target = link.getAttribute("href");

                    if (target === `#${currentId}`) {
                        link.setAttribute("aria-current", "page");
                    } else {
                        link.removeAttribute("aria-current");
                    }
                });
            }

        });

    }, observerOptions);

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}
