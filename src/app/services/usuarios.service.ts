import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {   ActionSheetController } from '@ionic/angular';
import { AlertasService } from './alertas.service';
import { environment } from 'src/environments/environment';;
import { Usuarios } from '../models/usuarios';
import * as bcrypt from 'bcryptjs';  // npm install bcryptjs --save  &&  npm install @types/bcrypt --save-dev


import { format } from 'date-fns';
import { PerfilUsuario } from '../models/perfilUsuario';




@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuarioActual: PerfilUsuario
  usuarios: PerfilUsuario[] = []
  userLogin = {
    usuario: '',
    contrasena: '',
    intentos: 0
  };

  idioma: string = '';
  today = new Date();
  lastDayOfMonth = new Date(this.today.getFullYear(), this.today.getMonth()+1, 0);
  Fecha_Inicio = this.today.getFullYear()+'-'+(this.today.getMonth() +1) +'-'+this.today.getDate();
  Fecha_Fin = this.today.getFullYear()+'-'+(this.lastDayOfMonth.getMonth() +1) +'-'+this.lastDayOfMonth.getDate();

  
  constructor(
    private http: HttpClient,
    private route: Router,
    public alertasService: AlertasService,
    public actionSheetCtrl: ActionSheetController,
  
    ) {


     }




    private postForgotPassword(data) {

      const URL = this.getURL(environment.postForgotPassword);
  
      const options = {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Acess-Control-Allow-Origin': '*'
        }
      };
  
      console.log('post url', URL);
      console.log('post user', data)
  
      return this.http.post(URL, JSON.stringify(data), options);
    }
    

    
    syncPostForgotPassword(data) {

      return this.postForgotPassword(data).toPromise();
    }

    private postTokenVerification(data) {

      const URL = this.getURL(environment.postTokenVerification);
  
      const options = {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Acess-Control-Allow-Origin': '*'
        }
      };
  
      console.log('post url', URL);
      console.log('post user', data)
  
      return this.http.post(URL, JSON.stringify(data), options);
    }
  
    syncPostTokenVerification(data) {

      return this.postTokenVerification(data).toPromise();
    }
    private putUserPassword(data) {

      let URL = this.getURL(environment.postUserPassword);
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };
      console.log(URL)
      console.log(data)
      return this.http.post(URL, JSON.stringify(data), options);
    }
    syncPutUserPasswordToPromise($data) {
      return this.putUserPassword($data).toPromise();
  
    }

    private imagePost(data, Cod_Usuario){


      let URL = this.getURL(environment.postFotoUsuarioURL);
       URL = URL + Cod_Usuario
      const options   = {
        headers: {
          'enctype': 'multipart/form-data;',
          'Accept': 'plain/text',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token',
          
        }
      };
    
    console.log('URL',URL,data, 'data post image', JSON.stringify(data))
    
      return this.http.post(URL,data, options);
    
    
    }


syncImagePost(data, Cod_Usuario){

 return this.imagePost(data, Cod_Usuario).toPromise();
}




    cerrarSession(){
      this.usuarioActual = null;
      this.route.navigate([ '/inicio/inicio-sesion']);
    }
  
  
    _calculateAge(birthday) { // birthday is a date
      var ageDifMs = Date.now() - new Date(birthday).getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - new Date().getFullYear());
  }

  



  getURL( api: string ){

    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }
    const URL = environment.preURL  + test +  environment.postURL + api 
    return URL;

  }



   // PUT: api/usuarios/?Cod_Usuario= 2   ACTUALIZAR USUARIO


    //
    private   putProfile( usuario, Cod_Usuario ){
      let URL = this.getURL( environment.putUsuarioURL);

      URL = URL +Cod_Usuario;
      const options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
      };
     
   
      return this.http.put( URL, JSON.stringify(usuario), options );
    }

     actualizarUsuario(usuario, Cod_Usuario ){
/**
 *       if(this.gestorImagenesService.images.length > 0){
        usuario.Foto = this.gestorImagenesService.images[0].fileName;
      }else{
        usuario.Foto = '';
      }
     
 */

      this.alertasService.presentaLoading('Guardando cambios..')
      console.log('usuario', usuario)
      this.putProfile( usuario, Cod_Usuario ).subscribe(
        (resp:any) => {


          this.loginURL(this.usuarioActual.usuario.Correo).subscribe(resp =>{
            
            this.alertasService.loadingDissmiss();
            this.usuarioActual = resp;
            this.alertasService.message('FUTPLAY','El perfil se actualizo con exito')
          })
        //  this.gestorImagenesService.startUpload(   this.gestorImagenesService.images[0])
/**
 *           this.gestorImagenesService.startUpload(this.gestorImagenesService.images[0],this.gestorImagenesService.images[0].fileName ,'perfil-usuario')
 */
 
        }, error => {
          this.alertasService.loadingDissmiss();
          console.log('error', error)
        }
      )
    }


  


  private loginURL( entrada: string){
    let  URL = this.getURL( environment.getLoginURL);
         URL = URL + entrada;
    console.log(URL)
    return this.http.get<any>( URL );
  }

  private getListaUsuarios( Cod_Usuario){
    let  URL = this.getURL( environment.getListaUsuariosURL);
         URL = URL + Cod_Usuario;
    console.log(URL)
    return this.http.get<PerfilUsuario[]>( URL );
  }
  

  syncListaUsuariosToPromise(Cod_Usuario){

   return this.getListaUsuarios(Cod_Usuario).toPromise();
  }
  syncLogin(entrada: string, contrasena:string){


    this.alertasService.presentaLoading('Verificando Datos');

    this.loginURL(entrada).subscribe(
      (resp) =>{
console.log('resp', resp)
 if( resp ){

  this.alertasService.loadingDissmiss();

  if(this.comparePassword(contrasena, resp.usuario.Contrasena )){
    this.usuarioActual = resp;       

    console.log('login user', resp)
    this.route.navigateByUrl('/futplay/mi-perfil',{replaceUrl:true});
   }
  
   else{
    this.alertasService.loadingDissmiss();
    this.alertasService.message('FUTPLAY','Usuario o contraseña incorrectos');
  
    return;
   }

 }else{
  this.alertasService.loadingDissmiss();
  this.alertasService.message('FUTPLAY','Usuario o contraseña incorrectos');
 }

      }, error =>{
        this.alertasService.loadingDissmiss();
        this.alertasService.message('FUTPLAY','Error, contacte al administrador');
      })
  }





// REMUEVE ESPACIOS

removerEspacios(element:string) {
  return element.split(' ').join('');
  }

// VALIDAR CORREO


validarCorreo(email) {
  const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regularExpression.test(String(email).toLowerCase());
 }






  // END LOGIN SECTION


    // POST USUARIO

    private postUsuario (usuario){
      const URL = this.getURL( environment.postUserURL );

      console.log('post user', URL)
      const options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
      };
     
      return this.http.post( URL, JSON.stringify(usuario), options )
    }


    comparePassword(password, databasePwd){

      if(bcrypt.compareSync(password, databasePwd)){
        return true;
      }else{
        return false;
      }
    }
  
    hashPassword(Contrasena){

      return bcrypt.hashSync(Contrasena, 10);
    }
   
    registro(usuario:Usuarios){
  this.alertasService.presentaLoading('Generando registro');
  usuario.Fecha_Nacimiento = format(new Date(usuario.Fecha_Nacimiento), 'yyyy-MM-dd')
  usuario.Contrasena = bcrypt.hashSync(usuario.Contrasena, 10)
        this.postUsuario(usuario).subscribe(    
          (resp:any) => {
            this.alertasService.loadingDissmiss();

            console.log('posttt', usuario)

            this.usuarioActual = resp;

            if(this.usuarioActual){
          
              this.route.navigateByUrl('/futplay/mi-perfil',{replaceUrl:true});
              return;
            } 
           
          
    
            this.alertasService.message('Futplay','Lo sentimos algo salio mal')
            this.route.navigate(['/registro']);
    
   
  
       
      }, error =>{
        this.alertasService.loadingDissmiss();
        this.alertasService.message('FUTPLAY', 'Error creando el usuario, verifica que el usuario no exista!.')
      });
     
    }
    private deleteUser(id: number) {

      let URL = this.getURL(environment.deleteUser);
      URL = URL + id
  
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
  
      };
  
      return this.http.delete(URL, options);
  
    }
  
    syncDeleteUserToPromise(id: any) {
  
      return this.deleteUser(id).toPromise();
    }
  

}
