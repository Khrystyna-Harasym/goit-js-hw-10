import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import {fetchCountries} from './fetchCountries.js'

const DEBOUNCE_DELAY = 300;


const form = document.getElementById('search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

form.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    e.preventDefault();

    const name = e.target.value.trim();
    if (name === '') {
        clearMarkup();
        return;
    }
    fetchCountries(name).then((countries) => {
        if (countries.length > 10) {
            clearMarkup();
            Notiflix.Notify.info(
                'Too many matches found. Please enter a more specific name.'
            );
        } else if (countries.length >= 2 && countries.length <= 10) {
            markupCountryList(countries);
            console.log(countries);
        } else {
            markupCounrtyInfo(countries);
            console.log(countries);
        }
    }).catch(onError);
};

function markupCountryList(countries) {
    const markupList = countries.map(country => {
        return `<li>
        <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="30">
        <p>${country.name.official}</p>
        </li>`;
    }).join('');
    clearMarkup('list');
    list.innerHTML = markupList;
    
}

function markupCounrtyInfo(countries) {
    const markupInfo = countries.map(country => {
         return `<img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="30">
        <b>${country.name.official}</b>
        <p><b>Capital</b>: ${country.capital}</p>
        <p><b>Population</b>: ${country.population}</p>
        <p><b>Languages</b>: ${Object.values(country.languages)} </p>`
    }).join('');
    clearMarkup('info');
    info.innerHTML = markupInfo;
}
function clearMarkup() {
  list.innerHTML = '';
  info.innerHTML = '';
}
function onError(error) {
  
       Notiflix.Notify.failure('Oops, there is no country with that name');
       
}

