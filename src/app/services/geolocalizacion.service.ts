import { Injectable } from '@angular/core';
import { AlertasService } from './alertas.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

interface valores {
  id: string,
  valor: string
}

@Injectable({
  providedIn: 'root'
})
export class GeolocalizacionService {
  paises: valores[] = [];
  estados: valores[] = [];
  ciudades: valores[] = [];
  Codigo_Postal = [];
  Codigo_Pais = '';
  Codigo_Estado = '';
  Codigo_Ciudad = '';

  constructor(
    public alertasService: AlertasService,
    public http: HttpClient
  ) { }

  loadCountries() {
    this.getCountries().toPromise().then((paises: any[]) => {
      paises.forEach(pais => {
        let data = {
          id: pais.iso2,
          valor: pais.name
        };
        this.paises.push(data);
      });
    });
  }

  private getCountries() {
    let URL = 'https://api.countrystatecity.in/v1/countries';
    URL = URL;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'X-CSCAPI-KEY': 'V1Fub3lWNW1zWk12TjhGdjZBMUxkSGp0b3dwaHdNaWJLekVhajFndA=='
      }
    };
    return this.http.get(URL, options);
  }

  private getStates() {
    let URL = `https://api.countrystatecity.in/v1/countries/${this.Codigo_Pais}/states`;
    URL = URL;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'X-CSCAPI-KEY': 'V1Fub3lWNW1zWk12TjhGdjZBMUxkSGp0b3dwaHdNaWJLekVhajFndA=='
      }
    };
    return this.http.get(URL, options);
  }

  private getCities() {
    let URL = `https://api.countrystatecity.in/v1/countries/${this.Codigo_Pais}/states/${this.Codigo_Estado}/cities`;
    URL = URL;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'X-CSCAPI-KEY': 'V1Fub3lWNW1zWk12TjhGdjZBMUxkSGp0b3dwaHdNaWJLekVhajFndA=='
      }
    };
    return this.http.get(URL, options);
  }

  loadStates() {
    this.alertasService.presentaLoading('Cargando datos..');
    this.getStates().toPromise().then((states: any[]) => {
      if (states.length == 0) {
        this.alertasService.loadingDissmiss();
      }
      states.forEach((state, index) => {
        let data = {
          id: state.iso2,
          valor: state.name
        };
        this.estados.push(data);
        if (index == states.length - 1) {
          this.alertasService.loadingDissmiss();
          if (this.Codigo_Estado != null) {
            this.loadCities();
          }
        }
      });
    });
  }

  loadCities() {
    this.alertasService.presentaLoading('Cargando datos..');
    this.getCities().toPromise().then((cities: any[]) => {
      if (cities.length == 0) {
        this.alertasService.loadingDissmiss();
      }
      cities.forEach((city, index) => {
        let data = {
          id: city.id,
          valor: city.name
        };
        this.ciudades.push(data);
        if (index == cities.length - 1) {
          this.alertasService.loadingDissmiss();
        }
      });
    });
  }

  async onChangeCountries(form: NgForm) {
    let registro = form.value;
    this.Codigo_Pais = registro.Codigo_Pais;
    this.Codigo_Estado = null;
    this.Codigo_Postal = null;
    this.estados = [];
    this.loadStates();
  }

  onChangeStates(form: NgForm) {
    let registro = form.value;
    this.Codigo_Estado = registro.Codigo_Estado;
    this.ciudades = [];
    this.Codigo_Ciudad = null;
    this.Codigo_Postal = null;
    this.loadCities();
  }

  onChangeCities(form: NgForm) {
    let registro = form.value;
    this.Codigo_Ciudad = registro.Codigo_Ciudad;
    this.Codigo_Postal = null;
  }
}