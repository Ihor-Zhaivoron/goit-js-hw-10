const BASE_URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(countryName) {
  return fetch(
    `${BASE_URL}${countryName}?fields=name,capital,population,flags,languages`
  )
    .then(r => {
      if (!r.ok || r.status === 404) {
        throw new Error("I don't know such a country");
      }
      return r.json();
    })
    .catch(err => console.log(err));
}
