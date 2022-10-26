import '../css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import markupInfo from '../templates/markupInfo.hbs';
import markupList from '../templates/markupList.hbs';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const countryName = e.target.value.trim();

  if (!countryName) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(countryName)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if ((countries.length > 2) & (countries.length < 10)) {
        countryInfo.innerHTML = '';
        renderListCountry(countries);
      } else {
        countryList.innerHTML = '';
        renderInfoCoutry(countries);
      }
    })
    .catch(err => {
      Notify.failure(err.message);
    });
}

function renderListCountry(countries) {
  countryList.innerHTML = markupList(countries);
}

function renderInfoCoutry(countries) {
  countryInfo.innerHTML = markupInfo(countries);
}
