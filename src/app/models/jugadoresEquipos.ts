
export class JugadoresEquipos {
    constructor(
        public  Cod_Posicion: number,
        public Posicion: string,
        public Cod_Usuario: number,
        public Nombre: string,
        public Primer_Apellido: string,
        public Segundo_Apellido: string,
        public Foto: string,
        public Estatura: number,
        public Peso: number,
        public Apodo: string,
        public Partidos_Jugados: number,
        public Partidos_Jugador_Futplay: number,
        public Cod_Provincia: 4,
        public Provincia: string,
        public Cod_Canton: number,
        public Canton: string,
        public Cod_Distrito: number,
        public Distrito: string,
        public Cod_Equipo: number,
        public Abreviacion:string,
        public Nombre_Equipo: string,
        public Foto_Equipo: string,
        public Avatar:boolean
        
    ){}
}
