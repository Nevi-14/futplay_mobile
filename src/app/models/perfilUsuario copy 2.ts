export class PerfilUsuario {
    constructor(
    public Cod_Usuario:  number,
    public Cod_Posicion: number,
    public Posicion:string,
    public Nombre: string,
    public Primer_Apellido: string,
    public Segundo_Apellido: string,
    public Foto:string,
    public Telefono: string,
    public Correo: string,
    public Fecha_Nacimiento: Date,
    public Contrasena: string,
    public Modo_Customizado: boolean,
    public Intentos: number,
    public Estatura: number,
    public Peso: number,
    public Apodo: string,
    public Partidos_Jugados: number,
    public Partidos_Jugador_Futplay: number,
    public Partidos_Jugador_Del_Partido : number,
    public Compartir_Datos : boolean,
    public Pais: string,
    public Estado: boolean,
    public Descripcion_Estado: string,
    public Cod_Pais: string,
    public Extranjero:boolean,
    public Avatar: boolean
    ){}
    
    }