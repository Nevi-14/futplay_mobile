import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {  ActionSheetButton, ActionSheetController } from '@ionic/angular';
import { CanchasService } from './canchas.service';
import { Canchas } from '../models/canchas';
import { ReservacionesService } from './reservaciones.service';
import { PerfilUsuario } from '../models/perfilUsuario';
import { AlertasService } from './alertas.service';
import { environment } from 'src/environments/environment';
import { SolicitudesService } from './solicitudes.service';




@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuarios: PerfilUsuario[]=[];
  usuarioActual: PerfilUsuario
  userLogin = {
    usuario: '',
    contrasena: '',
    intentos: 0
  };
  listaCanchasUsuario: Canchas[]=[];
  
  constructor(
    private http: HttpClient,
    private route: Router,
    public canchasService: CanchasService,
    public reservacionesService: ReservacionesService,
    public alertasService: AlertasService,
    public actionSheetCtrl: ActionSheetController,
    public solicitudesService:SolicitudesService
    ) {


     }



    cerrarSession(){
      this.usuarioActual = null;
      this.route.navigate([ '/inicio/login']);
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


  putURL( api: string,id: string ){
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }

    const URL = environment.preURL  + test +  environment.postURL + api + environment.codUsuarioParam +id;

    console.log(URL)
    return URL;
  }



   // PUT: api/usuarios/?Cod_Usuario= 2   ACTUALIZAR USUARIO


    //
    private   putProfile( usuario, Cod_Usuario ){
      const URL = this.putURL( environment.usuariosURL, Cod_Usuario);
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

      console.log('usuario', usuario)
      this.putProfile( usuario, Cod_Usuario ).subscribe(
        resp => {
              
           
          this.syncLogin(usuario.Correo, usuario.Contrasena)
      this.alertasService.message('FUTPLAY','Datos Actualizados')
        }, error => {
          console.log('error', error)
        }
      )
    }




  getLoginURL( api: string,correo: string, contrasena:string ){
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }

    const URL = environment.preURL  + test +  environment.postURL + api + environment.correoParam+ correo + environment.contrasenaPatam + contrasena;
    return URL;
  }  private loginURL( correo: string, contrasena:string){
    const URL = this.getLoginURL( environment.loginURL,correo,contrasena);
    console.log(URL)
    return this.http.get<PerfilUsuario>( URL );
  }


  syncLogin(correo: string, contrasena:string){
    this.usuarioActual = null;

    this.alertasService.presentaLoading('Verificando Datos')

    this.loginURL(correo, contrasena).subscribe(
      resp =>{
  this.alertasService.loadingDissmiss();

console.log(resp,'resppppp')
        if(resp){
 let user = this.syncPerfilUsuario(resp[0].Cod_Usuario);

 this.alertasService.presentaLoading('Cargando Perfil de usuario')
   user.then( resp =>{
     this.alertasService.loadingDissmiss();
    this.usuarioActual = resp[0]
console.log(  this.usuarioActual , '  this.usuarioActual ')
   this.solicitudesService.syncGetSolicitudesJugadores(this.usuarioActual.Cod_Usuario, false,true, true)
   
 
    console.log('perfil usuario',  resp[0])
    this.route.navigate(['/home/profile']);
   })

        
        
        }else{

          this.alertasService.message('FUTPLAY','Usuario o contraseña incorrectos');
        }

        
      } , error =>{

    if(error){
      this.alertasService.message('FUTPLAY','Se ha producido un error');

    }

      }

    );
  }


  private perfilUsuario( id: number){
    let URL = this.getURL( environment.perfilUsuario);
    URL = URL+environment.codUsuarioParam+ id;  

    console.log(URL,'PERFIL ')
    return this.http.get<PerfilUsuario>( URL );
  }

   syncPerfilUsuario(id: number){
 
return this.perfilUsuario(id).toPromise();

  }



  private getUsuarios( Cod_Usuario){
  let URL = this.getURL( environment.usuariosURL);
     URL = URL + environment.codUsuarioParam +Cod_Usuario;

    return this.http.get<PerfilUsuario[]>( URL );
  }

  syncUsusarios(Cod_Usuario){

    this.getUsuarios(Cod_Usuario).subscribe(
      resp =>{
        this.usuarios = resp.slice(0);
        console.log(this.usuarios,'usuarios')

      }

    );
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
      const URL = this.getURL( environment.usuariosURL );
      const options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
      };
     
      return this.http.post( URL, JSON.stringify(usuario), options )
    }
  
    registro(usuario){

      this.alertasService.presentaLoading('Generando registro');

      this.postUsuario(usuario).subscribe(
      
       ( resp : PerfilUsuario) => {
        let   localvariable: PerfilUsuario; // or whatever u want 
   
    localvariable = resp

     this.alertasService.loadingDissmiss();

let user = this.syncPerfilUsuario(localvariable.Cod_Usuario);

this.alertasService.presentaLoading('Cargando Perfil de usuario')
  user.then( resp =>{

  this.alertasService.loadingDissmiss();
   this.usuarioActual = resp[0]

   this.route.navigate(['/home/profile']);

  })

        }, error => {

          this.alertasService.message('FUTPLAY', 'Error creando el usuario')
        }
      )
    }



}
