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
import { ChangeDetectorRef } from '@angular/core';



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
    public solicitudesService:SolicitudesService,
    ) {


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
/**
 *       if(this.gestorImagenesService.images.length > 0){
        usuario.Foto = this.gestorImagenesService.images[0].fileName;
      }else{
        usuario.Foto = '';
      }
     
 */
      console.log('usuario', usuario)
      this.putProfile( usuario, Cod_Usuario ).subscribe(
        resp => {
        //  this.gestorImagenesService.startUpload(   this.gestorImagenesService.images[0])
/**
 *           this.gestorImagenesService.startUpload(this.gestorImagenesService.images[0],this.gestorImagenesService.images[0].fileName ,'perfil-usuario')
 */
console.log(resp, 'resssp')
           
          this.syncDatos(usuario.Cod_Usuario)
 
        }, error => {
          console.log('error', error)
        }
      )
    }

    private verificarUsuario( Cod_Usuario:number){
      let URL = this.getURL( environment.actualizarDatos);

      URL = URL + environment.codUsuarioParam + Cod_Usuario
      console.log(URL)
      return this.http.get<PerfilUsuario>( URL );
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
  syncDatos(Cod_Usuario:number){

    this.alertasService.presentaLoading('Cargando datos...')

    this.verificarUsuario(Cod_Usuario).subscribe(
      resp =>{
  this.alertasService.loadingDissmiss();
this.usuarioActual = resp[0];

console.log('feril actualziado' , resp , this.usuarioActual ,  resp[0])

        
      } , error =>{

    if(error){
      this.alertasService.message('FUTPLAY','Se ha producido un error');

    }

      }

    );
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
    this.route.navigate(['/futplay/mi-perfil']);
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

  private filtrarUsuarios( Cod_Provincia: number, Cod_Canton:number,Cod_Distrito:number,Cod_Posicion:number,Estatura:number,Peso:number){

    let URL = this.getURL( environment.fitrarUsuarios);
   let params = environment.Cod_Provincia+ Cod_Provincia + environment.Cod_Canton_Param+ Cod_Canton +
                environment.Cod_Distrito_Param+ Cod_Distrito + environment.Cod_Posicion_Param+ Cod_Posicion + 
                environment.Estatura_Param+ Estatura + environment.Peso_Param+ Peso
    URL = URL+ params

    console.log(URL,'filtro Usuarios ')

    return this.http.get<PerfilUsuario[]>( URL );
  }

   syncfiltrarUsuarios(Cod_Provincia: number, Cod_Canton:number,Cod_Distrito:number,Cod_Posicion:number,Estatura:number,Peso:number){
 
this.filtrarUsuarios(Cod_Provincia,Cod_Canton,Cod_Distrito,Cod_Posicion,Estatura,Peso).subscribe(

  resp =>{
this.usuarios = [];
    this.usuarios = resp.slice(0);

    console.log(this.usuarios,'usuarios')


  }

);
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

   this.route.navigate(['/futplay/mi-perfil']);

  })

        }, error => {
          this.alertasService.loadingDissmiss();
          this.alertasService.message('FUTPLAY', 'Error creando el usuario, verifica que el usuario no exista!.')
        }
      )
    }



}
