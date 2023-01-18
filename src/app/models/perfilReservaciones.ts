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
       public provincia:string,
       public correo:string,
public canton:string,
public distrito:string,
public categoria:string,
public titulo:string
        
    ){}
}
