
export class Usuarios {
    constructor(
        public Cod_Usuario: number,
        public Cod_Posicion: number,
        public Cod_Role: number,
        public Foto: string,
        public Nombre: string,
        public Primer_Apellido: string,
        public Segundo_Apellido: string,
        public Fecha_Nacimiento: any,
        public Telefono: string,
        public Correo: string,
        public Contrasena: string,
        public Intentos: number,
        public Peso: number,
        public Estatura: number,
        public Apodo: string,
        public Partidos_Jugados: number,
        public Partidos_Jugador_Futplay: number,
        public Partidos_Jugador_Del_Partido : number,
        public Compartir_Datos : boolean,
        public Avatar: boolean,
        public Codigo_Llamadas: string,
        public Inicio_Sesion: Date,
        public Estado : boolean,
        public Descripcion_Estado: string,
        public Idioma: string
    ){}
}