export default class NewApi{
    constructor() {
        this.name = '';  
    }
    fetchCountries() {
    return fetch(`https://restcountries.com/v3.1/name/${this.name}?fields=name,capital,population,flags,languages`)
      .then(response => {
      if (!response.ok) {
        Notiflix.Notify.failure("Oops, there is no country with that name")
        clearOutput();
      }
      return response.json();
      })
      .then((data) => {
        return data
    });
    }
    
    set countryName(countryName){
      this.name = countryName;
      
    }
}
