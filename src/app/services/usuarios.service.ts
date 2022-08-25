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
import { ChangeDetectorRef } from '@angular/core';
import { Usuarios } from '../models/usuarios';
import { IonicStorageModule } from '@ionic/storage-angular';
import * as bcrypt from 'bcryptjs';  // npm install bcryptjs --save  &&  npm install @types/bcrypt --save-dev npm i --save-dev @types/bcryptjs
import { SolicitudesService } from './solicitudes.service';
import { StorageService } from './storage-service';
import { VideoScreenPage } from '../pages/video-screen/video-screen.page';
import { AuthenticationService } from './authentication.service';


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
    public solicitudesService: SolicitudesService,
    public storageService: StorageService,
    public authenticationService: AuthenticationService
    
    ) {


     }


     hashPassword(Contrasena){

      return bcrypt.hashSync(Contrasena, 10);
    }

    cerrarSession(){
      this.storageService.delete('Cod_Usuario')
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

  private   putPartidosJugados( Cod_Equipo ){
    let URL = this.getURL( environment.partidosJugadorURL);
    URL = URL + environment.codEquipoParam + Cod_Equipo;
    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
    };
   
 
    return this.http.put( URL, options );
  }

  syncPartidosJugados(Cod_Usuario){
  return  this.putPartidosJugados(Cod_Usuario).toPromise();
  }
  private   putJugadorFutplay(Cod_Usuario ){
    let URL = this.getURL( environment.jugadorFutplayURL);

    URL = URL +environment.codUsuarioParam+ Cod_Usuario;
    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
    };
   
 
    return this.http.put( URL, options );
  }
  private   putJugadorDelPartido(Cod_Usuario ){
    let URL = this.getURL( environment.jugadorDelPartidoURL);

    URL = URL +environment.codUsuarioParam+ Cod_Usuario;
    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
    };
   
 
    return this.http.put( URL, options );
  }
  syncJugadorFutplay(Cod_Usuario){
    return  this.putJugadorFutplay(Cod_Usuario).toPromise();
    }
      syncJugadorDelPartido(Cod_Usuario){
    return  this.putJugadorDelPartido(Cod_Usuario).toPromise();
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
      return this.http.get<Usuarios>( URL );
    }
  


  getLoginURL( api: string,elementoEntrada: string, contrasena:string ){
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }

    const URL = environment.preURL  + test +  environment.postURL + api + environment.elementoEntrada+ elementoEntrada + environment.contrasenaPatam + contrasena;
    return URL;
  }  private loginURL( elementoEntrada: string, contrasena:string){
    const URL = this.getLoginURL( environment.loginURL,elementoEntrada,contrasena);
    console.log(URL)
    return this.http.get<PerfilUsuario[]>( URL );
  }
  syncDatos(Cod_Usuario:number){

    this.verificarUsuario(Cod_Usuario).subscribe(
      resp =>{

this.usuarioActual = resp[0];
this.perfilUsuario = resp[0];


console.log('feril actualziado' , resp , this.usuarioActual ,  resp[0])

        
      } , error =>{

    if(error){
      this.alertasService.message('FUTPLAY','Se ha producido un error');

    }

      }

    );
  }
  syncDatosToPromise(Cod_Usuario:number){


    return this.verificarUsuario(Cod_Usuario).toPromise();
  }
  isEmpty(object) {
    for (const property in object) {
      return false;
    }
    return true;
  }

  syncLogin(elementoEntrada: string, contrasena:string){

    this.alertasService.presentaLoading('Verificando Datos')
    this.loginURL(elementoEntrada, contrasena).subscribe(
      (resp: PerfilUsuario[]) =>{
       
console.log('respresp', resp, resp.length)
        if(resp.length > 0){

          if(this.comparePassword(contrasena, resp[0].Contrasena )){
          this.alertasService.loadingDissmiss();
          this.usuarioActual = resp[0];
       
          this.storageService.delete('Cod_Usuario')
          this.storageService.set('Cod_Usuario',  resp[0].Cod_Usuario)
   
          this.authenticationService.loadToken(true);
          this.route.navigateByUrl('/futplay/mi-perfil',{replaceUrl:true});
          this.solicitudesService.syncGetSolicitudesJugadores(this.usuarioActual.Cod_Usuario, false,true, true)

          
          }else{
            this.alertasService.loadingDissmiss();
            this.alertasService.message('FUTPLAY','suario o contrasena incorrecto')
          }

        }else{

          this.alertasService.loadingDissmiss();
          this.alertasService.message('FUTPLAY','Error, contacte al administrador');
        }
  

      }, error =>{
        this.alertasService.loadingDissmiss();
        this.alertasService.message('FUTPLAY','Error, contacte al administrador');
      })
  }


  private perfilUsuario( id: number){
    let URL = this.getURL( environment.perfilUsuario);
    URL = URL+environment.codUsuarioParam+ id;  

    console.log(URL,'PERFIL ')
    return this.http.get<PerfilUsuario[]>( URL );
  }

   syncPerfilUsuario(id: number){
 console.log('perfil error', id, this.usuarioActual)
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


  guardarStorage(){



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


    comparePassword(password, databasePwd){

      if(bcrypt.compareSync(password, databasePwd)){
        return true;
      }else{
        return false;
      }
    }
  
    registro(usuario:Usuarios){
      this.usuarioActual = null;
      this.alertasService.presentaLoading('Generando registro');

     usuario.Contrasena = bcrypt.hashSync(usuario.Contrasena, 10);
        this.postUsuario(usuario).subscribe(
      
          ( resp : PerfilUsuario) => {
          if(resp != null || resp != undefined ){
            console.log(resp, 'rekmm')
            this.alertasService.loadingDissmiss();
            this.usuarioActual = resp
            this.route.navigate(['/futplay/mi-perfil']);
          }else{
            this.alertasService.loadingDissmiss();
            this.alertasService.message('FUTPLAY', 'Error creando el usuario, verifica que el usuario no exista!.')
          }
             
      }, error =>{
        usuario.Contrasena = '';
        this.alertasService.loadingDissmiss();
        this.alertasService.message('FUTPLAY', 'Error creando el usuario, verifica que el usuario no exista!.')
      });
     
    }

    registroToPromise(usuario:Usuarios){
    return  this.postUsuario(usuario).toPromise();

    }

    private borrarUsuario(Cod_Usuario: number) {

      let URL = this.getURL(environment.eliminarUsuario);
      URL = URL + Cod_Usuario
    
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
    
      };
    
      return this.http.delete(URL, options);
    
    }
    
    syncDeleteUsuarioToPromise(Cod_Usuario: number) {
    
      return this.borrarUsuario(Cod_Usuario).toPromise();
    }
    
}
