// create a Web Component for the nav to load on all pages
class NavBar extends HTMLElement {
    constructor() {
        super();
    };

    connectedCallback() {
        this.innerHTML = `
            <div class="flex flex-row justify-between items-center">
                <div class="title-section flex flex-row gap-10 justify-center items-end">
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

    const toggleButton = document.querySelector(".toggle-btn");

    toggleButton.addEventListener("click", () => {
        console.log("toggle button clicked");
        const bodyEl = document.body;
        bodyEl.classList.toggle("dark");

        // conditional for inner text change
        if (bodyEl.classList.contains("dark")) {
            toggleButton.innerHTML = `<span class="mr-4"><i class="bi bi-sun"></i></span>Light Mode`
        } else {
            toggleButton.innerHTML = `<span class="mr-4"><i class="bi bi-moon-stars"></i></span>Dark Mode`
        }
    });
});