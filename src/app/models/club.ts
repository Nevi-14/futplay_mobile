
export class Club {
    constructor(
        public clubID: number,
        public usuarioID: number,
        public provinciaID: string,
        public cantonID: string,
        public distritoID: string,
        public foto: string,
        public nombre: string,
        public abreviacion: string,
        public direccion: string
    ){}
}
