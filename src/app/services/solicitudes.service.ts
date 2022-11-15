import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertasService } from './alertas.service';
import { Solicitudes } from '../models/solicitudes';
import { PerfilSolicitud } from '../models/perfilSolicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  solicitudesJugadoresArray:PerfilSolicitud[]=[]
solicitudesEquiposArray:PerfilSolicitud[]=[]
  constructor(
private http: HttpClient,
public alertasService: AlertasService

  ) { }


getURL(api:string){

  let test : string = '';

  if(!environment.prdMode){

     test = environment.TestURL;
  }

  const URL = environment.preURL + test + environment.postURL + api

 

  return URL;

}
private getSolicitudesRecibidasEquipo(Cod_Equipo ){
  let URL = this.getURL( environment.getSolicitudesRecibidasEquipoURL);
  URL = URL + Cod_Equipo;
  console.log('URL', URL)
  return this.http.get<PerfilSolicitud[]>( URL );
}

private getSolicitudesRecibidasUsuario(Cod_Equipo ){
  let URL = this.getURL( environment.getSolicitudesRecibidasUsuarioURL);
  URL = URL + Cod_Equipo;
  console.log('URL', URL)
  return this.http.get<PerfilSolicitud[]>( URL );
}
private getSolicitudesEnviadasEquipo(Cod_Equipo ){
  let URL = this.getURL( environment.getSolicitudesEnviadasEquipoURL);
  URL = URL + Cod_Equipo;
  console.log('URL', URL)
  return this.http.get<PerfilSolicitud[]>( URL );
}


private getSolicitudesEnviadasUsuario(Cod_Usuario ){
  let URL = this.getURL( environment.getSolicitudesEnviadasUsuarioURL);
  URL = URL + Cod_Usuario;
  console.log('URL', URL)
  return this.http.get<PerfilSolicitud[]>( URL );
}
private postSolicitud(solicitud:Solicitudes){
  let URL = this.getURL(environment.postSolicitudesURL);
  URL = URL +  solicitud.Cod_Equipo
  const options = {

    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
      'Access-Control-Allow-Origin':'*'
    }
  };

  return this.http.post(URL, JSON.stringify(solicitud),options);


}
private putSolicitud(solicitud:Solicitudes){
  let URL = this.getURL(environment.putSolicitudURL);
  URL = URL +  solicitud.Cod_Solicitud


  console.log('URL', URL)
  console.log('solicitud', solicitud)
  const options = {

    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
      'Access-Control-Allow-Origin':'*'
    }
  };

  return this.http.put(URL, JSON.stringify(solicitud),options);


}

syncPutSolicitudToProimise(solicitud:Solicitudes){

  return this.putSolicitud(solicitud).toPromise();
  
  
  }

generarSolicitud(solicitud){

return this.postSolicitud(solicitud).toPromise();


}
 
syncGetSolicitudesRecibidasEquipoToPromise(Cod_Equipo){

  return this.getSolicitudesRecibidasEquipo(Cod_Equipo).toPromise();
  
  
  }
  syncGetSolicitudesRecibidasUsuarioToPromise(Cod_Usuario){

    return this.getSolicitudesRecibidasUsuario(Cod_Usuario).toPromise();
    
    
    }
    syncGetSolicitudesEnviadasEquipoToPromise(Cod_Equipo){

      return this.getSolicitudesEnviadasEquipo(Cod_Equipo).toPromise();
      
      
      }
      syncGetSolicitudesEnviadasUsuarioToPromise(Cod_Usuario){
    
        return this.getSolicitudesEnviadasUsuario(Cod_Usuario).toPromise();
        
        
        }
}
