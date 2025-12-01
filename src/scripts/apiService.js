// fetch API data from REST Countries API
export async function fetchAllCountries() {
    try {
        console.log(`Attempting to retrieve API country data`);
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,region,borders,flags,languages');

        // use fetch methods to identify errors
        if (!response.ok) {
            throw new Error('API failed to retrieve all countries data')
        }

        const countryData = await response.json();
        console.log(`API country data retrieved successfully`);

        // return the data to import elsewhere
        return countryData;
    } catch (error) {
        console.error(`Error found while fetching all countries`, error);
    }
};