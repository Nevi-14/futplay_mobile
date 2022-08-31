CREATE VIEW PERFIL_USUARIO AS

SELECT po.Cod_Posicion, po.Posicion, r.Cod_Role , r.Nombre as Nombre_Role, u.Cod_Usuario, u.Nombre,u.Avatar, u.Primer_Apellido,u.Segundo_Apellido,u.Foto,u.Telefono,u.Correo,u.Fecha_Nacimiento,u.Contrasena, u.Modo_Customizado, u.Intentos , u.Estatura , u.Peso , u.Apodo , u.Partidos_Jugados , u.Partidos_Jugador_Futplay, u.Partidos_Jugador_Del_Partido , u.Compartir_Datos , u.Estado, u.Descripcion_Estado , u.Pais, u.Cod_Pais, u.Extranjero
FROM Usuarios u,
     Posiciones po,
     Roles r
WHERE u.Cod_Role = r.Cod_Role and
po.Cod_Posicion = u.Cod_Posicion 
