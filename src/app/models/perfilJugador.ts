import { Jugador } from './jugador';
import { Usuarios } from './usuarios';
import { Equipos } from './equipos';

export class PerfilJugador {
    constructor(
        public nombre:string, 
        public jugador: Jugador,
        public usuario:Usuarios,
        public equipo: Equipos,
        public pais : string,
        public  estado:string,
        public  ciudad : string,
        public posicion:string

    ) { }
}
