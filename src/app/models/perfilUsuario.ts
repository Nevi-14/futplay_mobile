import { Usuarios } from './usuarios';
export class PerfilUsuario {
    constructor(
      public nombre:string, 
     public usuario : Usuarios,
       public provincia : string,
       public  canton:string,
       public  distrito : string,
       public  posicion: string
        
    ){}
    
    }