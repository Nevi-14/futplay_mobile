CREATE VIEW USUARIO_CANCHA_RESERVACIONES AS

SELECT u.Cod_Usuario,u.Nombre AS Nombre_Usuario, u.Primer_Apellido AS Usuario_Primer_Apellido,u.Segundo_Apellido AS Usuario_Segundo_Apellido,u.Foto,c.Cod_Cancha, c.Nombre AS Nombre_Cancha , r.Cod_Reservacion  , r.Reservacion_Externa ,r.diaCompleto, r.Titulo  ,r.Fecha,
r.Hora_Inicio ,r.Hora_Fin    
FROM Usuarios u,
     Canchas c,
    Reservaciones r
WHERE u.Cod_Usuario = r.Cod_Usuario and
      c.Cod_Cancha = r.Cod_Cancha
    