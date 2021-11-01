
export class Solicitud{
    constructor(
        public solicitudID: number,
        public clubID: number,
        public usuarioID: number,
        public confirmacionUsuario: boolean,
        public confirmacionClub: boolean
    ){}
}
