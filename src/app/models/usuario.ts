
export class Usuario {
    constructor(
        public usuarioID: number,
        public roleID: number,
        public provinciaID: string,
        public cantonID: string,
        public distritoID: string,
        public foto: string,
        public nombre: string,
        public apellido1: string,
        public apellido2: string,
        public fechaNac: Date,
        public telefono: string,
        public direccion: string,
        public correo: string,
        public contrasena: string,
        public inentos: number
    ){}
}
