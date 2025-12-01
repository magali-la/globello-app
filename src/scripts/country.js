// get the country in question by pulling it from local storage on loadw
window.addEventListener("load", () => {
    let selectedCountry = localStorage.getItem('selectedCountry');
    console.log(selectedCountry);
    
    // store the name of the country in the header
    let countryHeader = document.querySelector('.retrievedCountryName');
    countryHeader.innerText = selectedCountry;
});