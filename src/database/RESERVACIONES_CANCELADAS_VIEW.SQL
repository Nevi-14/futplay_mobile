CREATE VIEW RESERVACIONES_CANCELADAS AS

SELECT 
dueno_cancha.Cod_Usuario as Cancha_Cod_Usuario ,cancha.Nombre as Nombre_Cancha, cancha.Foto as Foto_Cancha, cancha.Cod_Cancha as Cancha_Cod_Cancha,
cliente.Nombre as Nombre_Cliente, reservacion.Cod_Reservacion,reservacion.Cod_Estado, reservacion.Titulo, reservacion.Fecha, reservacion.Hora_Inicio, reservacion.Hora_Fin, 
confirmacion.Cod_Estado  as confirmacion_Estado, confirmacion.Cod_Confirmacion as Reservacion_Cod_Confirmacion,
factura.Monto_Abonado_Retador, factura.Monto_Abonado_Retador as Factura_Monto_Abonado_Retador, factura.Monto_Pendiente_Retador, factura.Monto_Pendiente_Rival, factura.Monto_FP, factura.Monto_Subtotal, factura.Monto_Total
FROM
usuarios dueno_cancha,
reservaciones reservacion,
confirmacion_reservaciones confirmacion,
canchas cancha,
Factura_Detalle_Reservaciones factura,
usuarios cliente

WHERE 
dueno_cancha.Cod_Usuario = cancha.Cod_Usuario and
cancha.Cod_Cancha  = reservacion.Cod_Cancha   and
reservacion.Cod_Reservacion = confirmacion.Cod_Reservacion AND
cliente.Cod_Usuario = reservacion.Cod_Usuario and
factura.Cod_Reservacion = reservacion.Cod_Reservacion and
reservacion.Cod_Estado  = 8