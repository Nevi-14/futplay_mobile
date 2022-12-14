import { Jugador } from './jugador';
import { Usuarios } from './usuarios';
import { Equipos } from './equipos';

export class PerfilJugador {
    constructor(
        public nombre:string, 
        public jugador: Jugador,
        public usuario:Usuarios,
        public equipo: Equipos,
        public provincia:string,
        public canton:string,
        public distrito:string,
        public posicion:string

    ) { }
}
