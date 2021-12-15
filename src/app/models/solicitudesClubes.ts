
export class SolicitudClubes{
    constructor(
        public solicitudID: number,
        public equipoID: number,
        public usuarioID: number,
        public confirmacionUsuario: boolean,
        public confirmacionEquipo: boolean,
        public fecha: Date
    ){}
}
