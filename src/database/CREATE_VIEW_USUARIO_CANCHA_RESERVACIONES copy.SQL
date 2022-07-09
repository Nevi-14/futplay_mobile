
CREATE VIEW USUARIO_CANCHA_RESERVACIONES AS
SELECT 
cancha.Nombre as Nombre_Cancha, rival.Abreviacion, reservacion.Cod_Reservacion, reservacion.Cod_Estado,reservacion.Cod_Usuario, cancha.Latitud, cancha.Longitud, usuario.Cod_Usuario as Cod_Usuario_Rival,rival.Nombre as Nombre_Rival, rival.Foto as Foto_Rival, retador.Foto as Foto_Retador, retador.Nombre as Nombre_Retador, reservacion.Cod_Cancha, reservacion.Titulo, reservacion.Fecha, reservacion.Hora_Inicio, reservacion.Hora_Fin,estados.Cod_Estado, estados.Estado as Estado_Reservacion,reservacion.Luz, reservacion.Precio_Hora, reservacion.Precio_Luz, confirmacion.Estado as Estado_Confirmacion, confirmacion.Cod_Retador, confirmacion.Cod_Rival, confirmacion.Confirmacion_Retador, confirmacion.Confirmacion_Rival, confirmacion.Estado
FROM
estados estados,
reservaciones reservacion,
confirmacion_reservaciones confirmacion,
canchas cancha,
usuarios usuario,
equipos rival,
equipos retador

WHERE 
estados.Cod_Estado = reservacion.Cod_Estado AND
reservacion.Cod_Reservacion = confirmacion.Cod_Reservacion AND
reservacion.Cod_Cancha = cancha.Cod_Cancha AND  reservacion.Cod_Usuario = usuario.Cod_Usuario and

confirmacion.Cod_Rival = rival.Cod_Equipo AND 
retador.Cod_Equipo  = confirmacion.Cod_Retador