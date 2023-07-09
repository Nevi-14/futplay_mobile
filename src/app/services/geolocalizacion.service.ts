import { Injectable } from '@angular/core';
import { AlertasService } from './alertas.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
// https://countrystatecity.in/
@Injectable({
  providedIn: 'root'
})
export class GeolocalizacionService {
  countries = [];
  states = [];
  cities = [];
  Zip_Code = [];
  Country_Code = '';
  State_Code = '';
  City_Code = '';
  Codigo_Postal = '';
  constructor(
public alertasService:AlertasService,
public http: HttpClient

  ) { }

  loadCountries(){
 
    this.getCountries().toPromise().then( (paises:any[])=>{
      console.log('paises', paises)
      paises.forEach( pais =>{
        let data = {
          id: pais.iso2,
          valor: pais.name
        }
this.countries.push(data)

      })
    })
  }
  private getCountries (){
    let URL = 'https://api.countrystatecity.in/v1/countries';
    URL = URL 
    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*', 
          'X-CSCAPI-KEY': 'V1Fub3lWNW1zWk12TjhGdjZBMUxkSGp0b3dwaHdNaWJLekVhajFndA=='  
}
    };
    return this.http.get( URL, options);
  }




private getStates(){
  let URL = `https://api.countrystatecity.in/v1/countries/${this.Country_Code}/states`;
  URL = URL 
  const options = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*', 
        'X-CSCAPI-KEY': 'V1Fub3lWNW1zWk12TjhGdjZBMUxkSGp0b3dwaHdNaWJLekVhajFndA=='  
}
  };
  return this.http.get( URL, options);

}

private getCities(){
  let URL = `https://api.countrystatecity.in/v1/countries/${this.Country_Code}/states/${this.State_Code}/cities`;
  URL = URL 
  const options = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*', 
        'X-CSCAPI-KEY': 'V1Fub3lWNW1zWk12TjhGdjZBMUxkSGp0b3dwaHdNaWJLekVhajFndA=='  
}
  };
  return this.http.get( URL, options);

}


loadStates(){
  this.alertasService.presentaLoading('Cargando datos..')
  this.getStates().toPromise().then( (states:any[])=>{
    console.log('states', states)
    if(states.length == 0){
      this.alertasService.loadingDissmiss();
    }
    states.forEach( (state, index) =>{
      let data = {
        id: state.iso2,
        valor: state.name
      }
this.states.push(data)
if(index == states.length -1){
  this.alertasService.loadingDissmiss();
}

    })
  })
}


loadCities(){
  this.alertasService.presentaLoading('Cargando datos..')
  this.getCities().toPromise().then( (cities:any[])=>{
    console.log('cities', cities)
    if(cities.length == 0){
      this.alertasService.loadingDissmiss();
    }
    cities.forEach( (city, index) =>{
      let data = {
        id: city.iso2,
        valor: city.name
      }
this.cities.push(data)
if(index == cities.length -1){
  this.alertasService.loadingDissmiss();
}

    })
  })
}

async onChangeCountries(fRegistro: NgForm) {
  let registro = fRegistro.value;
   this.Country_Code = registro.Country_Code;
   this.State_Code = null;
   this.Codigo_Postal  = null;
   this.states = [];
   this.loadStates();

}
onChangeStates(fRegistro: NgForm) {
  let registro = fRegistro.value;
  this.State_Code = registro.State_Code;
  this.cities = [];
  this.City_Code = null;
  this.Codigo_Postal  = null;
 this.loadCities();

}
onChangeCities(fRegistro: NgForm) {
  let registro = fRegistro.value;
  this.City_Code = registro.City_Code;
  this.Codigo_Postal  = null;

}
 




}
