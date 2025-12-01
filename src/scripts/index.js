import { fetchAllCountries } from "./apiService.js";

// define global variables for DOM elements
const countryCardGrid = document.querySelector("#countryCardGrid");

// Event listener to display country data in grid
window.addEventListener("load", () => {
    // run the fetch all country data and store in a variable to display in the grid
    async function displayAllCountries() {
        const countryData = await fetchAllCountries();
        console.log(`API countries data unwrapped in index.js`);

        // define the country card template clone
        const templateCountryCard = document.querySelector(".templateCountryCard");

        countryData.forEach(country => {
            // clone a template 
            let clonedCountryCard = templateCountryCard.cloneNode(true);

            // define elements on cloned card
            let flagImg = clonedCountryCard.querySelector("img");
            flagImg.src = `${country.flags.svg}`;
            flagImg.alt = `${country.flags.alt}`;
    
            // append the clonedCard to the grid
            countryCardGrid.append(clonedCountryCard);
        });
    

    }

    displayAllCountries();
});