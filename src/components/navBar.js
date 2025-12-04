// create a Web Component for the nav to load on all pages
class NavBar extends HTMLElement {
    constructor() {
        super();
    };

    connectedCallback() {
        this.innerHTML = `
            <div class="flex flex-col gap-4 md:flex-row justify-between items-center">
                <div class="title-section flex flex-col md:flex-row gap-10 justify-center items-end">
                    <p class="font-rock font-bold text-5xl dark:font-medium">globello</p>
                    <p>Say Hello Around the World</p>
                </div>
                <button class="toggle-btn"><span class="mr-4"><i class="bi bi-moon-stars"></i></span>Dark Mode</button>
            </div>
        `
    }
}

// register an custom element instance of the NavBar class
customElements.define("nav-content", NavBar);

window.addEventListener("load", () => {
    const navContainer = document.querySelector("#nav-container");
    const navContent = document.createElement("nav-content");
    // add class to navContent custom element to span width of its container
    navContent.classList.add('w-full', 'px-15');
    // append the new instance on page load
    navContainer.appendChild(navContent);

    // dark mode logic - define variables for toggle button and the body element where tailwind dark class toggles
    const toggleButton = document.querySelector(".toggle-btn");
    const htmlEl = document.documentElement;

    // conditional to set the dark mode button if dark was the preference
    if (onDarkMode === 'true') {
        console.log('Dark Mode retrieved via user preference, button updating while navbar loads');
        toggleButton.innerHTML = `<span class="mr-4"><i class="bi bi-sun"></i></span>Light Mode`;
    }

    toggleButton.addEventListener("click", () => {
        console.log("toggle button clicked");
        htmlEl.classList.toggle("dark");

        // conditional for inner text change
        if (htmlEl.classList.contains("dark")) {
            toggleButton.innerHTML = `<span class="mr-4"><i class="bi bi-sun"></i></span>Light Mode`;

            // store in local storage
            localStorage.setItem('darkMode', 'true');
        } else {
            toggleButton.innerHTML = `<span class="mr-4"><i class="bi bi-moon-stars"></i></span>Dark Mode`;

            localStorage.setItem('darkMode', 'false');
        }
    });
});