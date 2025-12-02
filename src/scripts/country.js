import { fetchAllCountries } from "./apiService.js";

// get the country in question by pulling it from local storage on loadw
window.addEventListener("load", async () => {
    let selectedCountry = localStorage.getItem('selectedCountry');
    console.log(selectedCountry);
    
    // store the name of the country in the header
    let countryHeader = document.querySelector('.retrievedCountryName');
    countryHeader.innerText = selectedCountry;

    // fetch the data from the apiService for that specific country with the name included
    let countryData = await fetchAllCountries();

    // filter to only include the country in question
    let selectedCountryObj = countryData.filter(country => country.name.common === selectedCountry);
    console.log(selectedCountryObj);

    // get the image
    // add flag to card
    let flagImgContainer = document.querySelector('.flagImageContainer')
    let flagImg = flagImgContainer.querySelector(".flagImage");
    flagImg.src = `${selectedCountryObj[0].flags.png}`;
    flagImg.alt = `${selectedCountryObj[0].flags.alt}`;

    // add the official name
    let officialName = document.querySelector('.officialName');
    if (selectedCountryObj[0].name.common !== selectedCountryObj[0].name.official){
            officialName.innerText = `${selectedCountryObj[0].name.official}`;
    }

    // add the region and capital
    // add region and capital to card
    let regionName = document.querySelector(".regionName");
    let countryCapital = document.querySelector(".countryCapital");
    regionName.innerText = `${selectedCountryObj[0].region}`;
    countryCapital.innerText = `${selectedCountryObj[0].capital}`;

    // add languages

// add border countries
    const bordersContainer = document.querySelector(".bordersContainer");
    // // clear what's in the lang container to accommodate search results
    // bordersContainer.innerHTML = '';
    
    // conditional if there are no border countries
    if (selectedCountryObj[0].borders.length === 0){
        bordersContainer.innerHTML = `<p class="italic">This country has no border countries.</p>`
    } else {
        selectedCountryObj[0].borders.forEach(borderCountry => {
            // create the element in the DOM
            const borderLabel = document.createElement('span');
            borderLabel.classList.add('templateLangLabel', 'px-2', 'py-1', 'rounded-lg', 'bg-peony', 'text-base');
            borderLabel.innerText = borderCountry;
            // append it to the container
            bordersContainer.append(borderLabel);
        });
    };
});