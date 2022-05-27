import './css/styles.css';
import Notiflix from 'notiflix'; 
import debounce from 'lodash.debounce';
import NewApi from './fetchCountries';
import countryInfoTemplate from './templates/country-info.hbs';
import countryListTemplate from './templates/country-list.hbs';

const DEBOUNCE_DELAY = 300;  


const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}   
 
const newApi = new NewApi(); 

refs.input.addEventListener('input', debounce(countrySearch, DEBOUNCE_DELAY))

function countrySearch(event) {
    newApi.countryName = event.target.value.trim();

    if (event.target.value.trim()=== '') {
        clearOutput()
        return
    }

    newApi.fetchCountries().then(data => {
        if (data.length > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
            clearOutput()
        } else if (data.length <= 10 && data.length > 1) {
            creatCountryList(data);
        } else if (data.length === 1) {
            creatCountryInfo(...data);
        } else
            rejected
    }).catch(error => {
        Notiflix.Notify.failure("Oops, there is no country with that name")
        clearOutput()
    })

}

function creatCountryList(data) {
    refs.countryList.innerHTML = countryListTemplate(data)
    clearCountryInfo()
}

function creatCountryInfo(data) {
    refs.countryInfo.innerHTML = countryInfoTemplate(data);
    clearCountryList()
}

function clearCountryList() {
    refs.countryList.innerHTML = '';
}

function clearCountryInfo() {
    refs.countryInfo.innerHTML = '';
}

function clearOutput() {
    clearCountryList()
    clearCountryInfo()
}
