// create a Web Component for the nav to load on all pages
class NavBar extends HTMLElement {
    constructor() {
        super();
    };

    connectedCallback() {
        this.innerHTML = `
            <div class="flex flex-row justify-between">
                <div class="title-section flex flex-row gap-4">
                    <h1>Globello</h1>
                    <p>|</p>
                    <p>Say Hello Around the World</p>
                </div>
                <button><span>icon</span> Dark Mode</button>
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
});