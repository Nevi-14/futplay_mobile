import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Email } from '../models/email';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    
    private http: HttpClient,
    public usuariosService: UsuariosService
    
    
    ) { }

  getURL( api:string ){
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }

    const URL = environment.preURL  + test +  environment.postURL + api;

    return URL;
  }


      // POST EMAIL

      private postEmail (email){
        const URL = this.getURL( environment.apiCorreoURL);
        const options = {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': '*'
          }
        };
       
        return this.http.post( URL, JSON.stringify(email), options );
      }
    
      syncToPromiseSendEmail(email:Email){


      return   this.postEmail(email).toPromise();

      }
      notificarUsuarios(Cod_Usuario, Subject ,Body){
   return     this.usuariosService.syncPerfilUsuario(Cod_Usuario).then(resp =>{
      
          var emailPost: Email  = {
           'ToEmail': null,
           'Subject':null,
           'Body': null,
         }
         emailPost.ToEmail = resp[0].Correo
         emailPost.Subject = Subject;
         emailPost.Body = Body;

          this.syncToPromiseSendEmail(emailPost).then(resp =>{
     
            console.log('emailPost  sent', emailPost)
          }, error =>{
            console.log('emailPost  error', emailPost)
          })
                 });
      }


}
