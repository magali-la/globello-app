import { fetchAllCountries } from "./apiService.js";

// define global variables for DOM elements
const countryCardGrid = document.querySelector("#countryCardGrid");
const searchInput = document.querySelector("#countrySearch");
const regionFilter = document.querySelector("#regionFilter");
let countryData = [];

// run the fetch all country data and store in a variable to display in the grid
async function displayAllCountries(countryData) {
    // define the country card template clone
    const templateCountryCard = document.querySelector(".templateCountryCard");

    // clear the grid
    countryCardGrid.innerHTML = '';
    countryData.forEach(country => {
        // clone a template 
        let clonedCountryCard = templateCountryCard.cloneNode(true);
        clonedCountryCard.classList.remove('hidden');

        // add flag to card
        let flagImg = clonedCountryCard.querySelector("img");
        flagImg.src = `${country.flags.svg}`;
        flagImg.alt = `${country.flags.alt}`;

        // add name to card
        let countryName = clonedCountryCard.querySelector(".countryName");
        let officialName = clonedCountryCard.querySelector(".officialName");
        countryName.innerText = `${country.name.common}`;

        // logic to display official name if it's different from countryName
        if (country.name.common !== country.name.official){
            officialName.innerText = `${country.name.official}`;
        }

        // add region and capital to card
        let regionName = clonedCountryCard.querySelector(".regionName");
        let countryCapital = clonedCountryCard.querySelector(".countryCapital");
        regionName.innerText = `${country.region}`;
        countryCapital.innerText = `${country.capital}`;

        // add languages
        const langContainer = clonedCountryCard.querySelector(".languagesContainer");
        // clear what's in the lang container to accommodate search results
        langContainer.innerHTML = '';
        

        Object.values(country.languages).forEach(language => {
            // create the element in the DOM
            const langLabel = document.createElement('span');
            langLabel.classList.add('templateLangLabel', 'px-2', 'py-1', 'rounded-lg', 'bg-school', 'text-base');
            langLabel.innerText = language;
            // append it to the container
            langContainer.append(langLabel);
        });

        // append the clonedCard to the grid
        countryCardGrid.append(clonedCountryCard);
    });


}

// Event listener to display country data in grid
window.addEventListener("load", async () => {
    countryData = await fetchAllCountries();
    console.log(`API countries data unwrapped in index.js`);
    displayAllCountries(countryData);
});


// search bar functionality
searchInput.addEventListener("input", (event) => {
    if (countryData.length === 0){
        return;
    }
    
    // set the user's input to lowercase
    let userSearch = event.target.value.toLowerCase();

    // filter the items into a new array
    const searchFilter = countryData.filter(country => 
        country.name.common.toLowerCase().includes(userSearch)
    );

    // run display countries function with filtered items
    displayAllCountries(searchFilter);
});

// region filter functionality
regionFilter.addEventListener("change", (event) => {
    let selectedRegion = event.target.value;
    let filteredCountries;
    // if the region selected isn't the default empty value, then set the filter
    if (selectedRegion !== ''){
        filteredCountries = countryData.filter(country => country.region === selectedRegion);
    } else {
        // display the default when the user is on the default placeholder item
        filteredCountries = countryData;
    }

    // call to diplay matching countries
    displayAllCountries(filteredCountries)
});

// hello button functionality
document.addEventListener("click", (event) => {
    // conditional to find the closest hello button to navigate to the country page
    if (event.target.closest('.helloButton')){
        // store the name of the country being clicked
        const countryCardSelected = event.target.closest('.helloButton').closest('.templateCountryCard');

        // store the name of the country selected
        let countryCardSelectedName = countryCardSelected.querySelector('.countryName');
        console.log(countryCardSelectedName.innerText);

        // store the last clicked name in local storage to use in the country.js
        localStorage.setItem('selectedCountry', countryCardSelectedName.innerText);

        // navigate to the country detail page
        window.location.href = 'country.html';
    }
});