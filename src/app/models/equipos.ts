
export class Equipos {
    constructor(
        public equipoID: number,
        public usuarioID: number,
        public provinciaID: number,
        public cantonID: number,
        public distritoID: number,
        public foto: string,
        public nombre: string,
        public abreviacion: string,
        public fecha: Date,
        public estrellas: number,
        public dureza: string,
    ){}
}
