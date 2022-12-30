const BASE_URL = 'https://restcountries.com/v3.1';
const PARAMETERS = 'name,capital,population,flags,languages';

function fetchCountries(name) {
  return fetch(`${BASE_URL}/name/${name}?fields=${PARAMETERS}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
}

export { fetchCountries };
