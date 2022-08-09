import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { HorarioCanchas } from '../models/horarioCanchas';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HorarioCanchasService {
horarioCancha:HorarioCanchas[] =[];

  constructor(private http: HttpClient, public modalCtrl: ModalController) { }

  getURL( api: string,id: string ){
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }

    const URL = environment.preURL  + test +  environment.postURL + api + environment.codCanchaParam + id;
console.log(URL);
    return URL;
  }

  getURLPUT( api: string ){
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }

    const URL = environment.preURL  + test +  environment.postURL + api;
console.log(URL);
    return URL;
  }



  private getHorarioCanchas( id){
    const URL = this.getURL( environment.horarioCanchasUrl,id);
    return this.http.get<HorarioCanchas[]>( URL );
  }

  syncHorarioCanchas(id){

    this.getHorarioCanchas(id).subscribe(
      resp =>{
        this.horarioCancha = resp.slice(0);
        console.log(this.horarioCancha, 'horario canchas')

      }

    );
  }


    //
    private   putHorario( horario ){
      const URL = this.getURLPUT( environment.actualizaHorarrioCanchaURL);
      const options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
      };
     
   
      return this.http.put( URL, horario, options );
    }

     actualizaHorario(horarios ){
      this.putHorario( horarios).subscribe(
        resp => {
         this.horarioCancha = [];
         this.modalCtrl.dismiss();
         console.log('completed')
        }, error => {
          console.log('error')
        }
      )
    }

}
