// Theme toggle
const themeToggle = document.getElementById("theme-toggle");


// Get saved theme
const savedTheme = localStorage.getItem("theme");


// Apply saved theme
if (savedTheme === "light") {

    document.body.classList.add("light-mode");

    if (themeToggle) {
        themeToggle.textContent = "🌙";
    }

}


// Toggle theme
if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");


        const isLightMode =
            document.body.classList.contains("light-mode");


        if (isLightMode) {

            localStorage.setItem("theme", "light");

            themeToggle.textContent = "🌙";

        } else {

            localStorage.setItem("theme", "dark");

            themeToggle.textContent = "☀️";

        }

    });

}