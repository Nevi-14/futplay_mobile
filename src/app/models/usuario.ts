
export class Usuario {
    constructor(
        public usuarioID: number,
        public roleID: number,
        public provinciaID: number,
        public cantonID: number,
        public distritoID: number,
        public foto: string,
        public nombre: string,
        public apodo: string,
        public apellido1: string,
        public apellido2: string,
        public fechaNac: Date,
        public telefono: string,
        public direccion: string,
        public correo: string,
        public contrasena: string,
        public intentos: number,
        public fecha: Date,
    ){}
}
