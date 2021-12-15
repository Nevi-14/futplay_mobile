
export class JugadoresEquipos {
    constructor(
        public jugadorEquipoID: number,
        public usuarioID: number,
        public equipoID: number,
        public fecha: Date,
        public administrador: Boolean

    ){}
}
