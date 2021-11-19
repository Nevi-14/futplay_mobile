
export class Club {
    constructor(
        public clubID: number,
        public usuarioID: number,
        public provinciaID: number,
        public cantonID: number,
        public distritoID: number,
        public foto: string,
        public nombre: string,
        public abreviacion: string,
        public direccion: string,
        public fecha: Date,
        public dureza: string,
        public estrellas: number
    ){}
}
