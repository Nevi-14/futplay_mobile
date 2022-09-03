
export class Usuarios {
    constructor(
        public Cod_Usuario: number,
        public Pais: string,
        public Cod_Pais : string,
        public Extranjero : boolean,
        public Cod_Posicion: number,
        public Cod_Role: number,
        public Modo_Customizado: boolean,
        public Foto: string,
        public Nombre: string,
        public Primer_Apellido: string,
        public Segundo_Apellido: string,
        public Fecha_Nacimiento: Date,
        public Telefono: string,
        public Correo: string,
        public Contrasena: string,
        public FechaRegistro : Date,
        public Intentos: number,
        public Estatura: number,
        public Peso: number,
        public Apodo: string,
        public Partidos_Jugados: number,
        public Partidos_Jugador_Futplay: number,
        public Partidos_Jugador_Del_Partido : number,
        public Compartir_Datos : boolean,
        public Avatar: boolean
    ){}
}
