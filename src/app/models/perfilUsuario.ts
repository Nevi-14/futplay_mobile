import { Usuarios } from './usuarios';
export class PerfilUsuario {
    constructor(
      public nombre:string, 
     public usuario : Usuarios,
     public pais : string,
     public  estado:string,
     public  ciudad : string,
       public  posicion: string
        
    ){}
    
    }