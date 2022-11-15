import { Canchas } from "./canchas";
import { DetalleReservaciones } from "./detalleReservaciones";
import { Equipos } from "./equipos";
import { Reservaciones } from "./reservaciones";
import { Usuarios } from "./usuarios";
import { Solicitudes } from './solicitudes';
 

export class PerfilSolicitud {
    constructor(
  
       public  solicitud: Solicitudes,
       public  equipo: Equipos,
       public  usuario: Usuarios,
       public  provincia:string,
       public  canton:string,
       public   distrito:string,
       public  posicicion:string
      
        
    ){}
}
