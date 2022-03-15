
CREATE TRIGGER CANCHAS_HORARIO ON CANCHAS
FOR INSERT
AS

INSERT INTO HORARIO_CANCHAS
        (Cod_Cancha, Cod_Dia    , Hora_Inicio, Hora_Fin)
    SELECT
       Cod_Cancha  , 1 ,'06:00:00' , '22:00:00'
        
        FROM inserted

        INSERT INTO HORARIO_CANCHAS
        (Cod_Cancha, Cod_Dia    , Hora_Inicio, Hora_Fin)
    SELECT
       Cod_Cancha  ,2 ,  '06:00:00' , '22:00:00'
        
        FROM inserted
                INSERT INTO HORARIO_CANCHAS
        (Cod_Cancha, Cod_Dia    , Hora_Inicio, Hora_Fin)
    SELECT
       Cod_Cancha  ,3 ,  '06:00:00' , '22:00:00'
        
        FROM inserted
                INSERT INTO HORARIO_CANCHAS
        (Cod_Cancha, Cod_Dia    , Hora_Inicio, Hora_Fin)
    SELECT
       Cod_Cancha  ,4 , '06:00:00' , '22:00:00'
        
        FROM inserted

            INSERT INTO HORARIO_CANCHAS
        (Cod_Cancha, Cod_Dia    , Hora_Inicio, Hora_Fin)
    SELECT
       Cod_Cancha  ,5 ,  '06:00:00' , '22:00:00'
        
        FROM inserted

              INSERT INTO HORARIO_CANCHAS
        (Cod_Cancha, Cod_Dia    , Hora_Inicio, Hora_Fin)
    SELECT
       Cod_Cancha  ,6 ,  '06:00:00' , '22:00:00'
        
        FROM inserted
                      INSERT INTO HORARIO_CANCHAS
        (Cod_Cancha, Cod_Dia    , Hora_Inicio, Hora_Fin)
    SELECT
       Cod_Cancha  ,7 , '06:00:00' , '22:00:00'
        
        FROM inserted