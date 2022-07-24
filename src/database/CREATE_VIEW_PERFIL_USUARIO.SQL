
CREATE VIEW PERFIL_USUARIO AS

SELECT po.Cod_Posicion, po.Posicion, r.Cod_Role , r.Nombre as Nombre_Role, u.Cod_Usuario, u.Nombre,u.Avatar, u.Primer_Apellido,u.Segundo_Apellido,u.Foto,u.Telefono,u.Correo,u.Fecha_Nacimiento,u.Contrasena, u.Modo_Customizado, u.Intentos , u.Estatura , u.Peso , u.Apodo , u.Partidos_Jugados , u.Partidos_Jugador_Futplay, u.Estado, u.Descripcion_Estado ,
p.Cod_Provincia AS Cod_Provincia,   p.Provincia AS Provincia  ,
c.Cod_Canton AS Cod_Canton ,  c.Canton AS Canton, d.Cod_Distrito AS Cod_Distrito  , d.Distrito AS Distrito 
FROM Usuarios u,
     Posiciones po,
     Roles r,
     Provincias p,
     Cantones c,
     Distritos d
WHERE u.Cod_Role = r.Cod_Role and
po.Cod_Posicion = u.Cod_Posicion and
      u.Cod_Provincia = p.Cod_Provincia and
      u.Cod_Canton = c.Cod_Canton and
      u.Cod_Distrito = d.Cod_Distrito and
      u.Cod_Canton = d.Cod_Canton