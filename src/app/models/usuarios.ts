
export class Usuarios {
    constructor(
        public usuarioID: number,
        public provinciaID: number,
        public cantonID: number,
        public distritoID: number,
        public administrador: boolean,
        public customMode: boolean,
        public nombre: string,
        public apellido1: string,
        public apellido2: string,
        public fechaNac: Date,
        public foto: string,
        public telefono: string,
        public correo: string,
        public contrasena: string,
        public intentos: number,
        public fecha: Date,
        public posicion: number,
        public apodo: string,
    ){}
}
