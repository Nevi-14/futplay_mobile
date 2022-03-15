export class PerfilUsuario {
    constructor(
    public Cod_Usuario:  number,
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
    public Cod_Provincia: number,
    public Estado: boolean,
    public Descripcion_Estado: string,
    public Provincia: string,
    public Cod_Canton: number,
    public Canton: string,
    public Cod_Distrito:number,
    public Distrito:string
    ){}
    
    }