import { Canchas } from "./canchas";
import { DetalleReservaciones } from "./detalleReservaciones";
import { Equipos } from "./equipos";
import { Reservaciones } from "./reservaciones";
import { Usuarios } from "./usuarios";
 

export class PerfilReservaciones {
    constructor(
        public cancha : Canchas,
     public reservacion : Reservaciones,
       public  detalle:DetalleReservaciones,
       public  rival : Equipos,
       public  usuario_rival: Usuarios,
       public  retador: Equipos,
       public  usuario_retador: Usuarios,
       public pais:string,
       public correo:string,
public estado:string,
public ciudad:string,
public categoria:string,
public titulo:string
        
    ){}
}
