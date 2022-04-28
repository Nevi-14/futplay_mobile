
CREATE TRIGGER CANCHAS_HORARIO ON CANCHAS
FOR INSERT
AS

INSERT INTO HORARIO_CANCHAS
        (Cod_Cancha, Cod_Dia    , Hora_Inicio, Hora_Fin)
    SELECT
       Cod_Cancha  , 1 ,'6:00:00' , '22:00:00'
        
        FROM inserted

        INSERT INTO HORARIO_CANCHAS
        (Cod_Cancha, Cod_Dia    , Hora_Inicio, Hora_Fin)
    SELECT
       Cod_Cancha  ,2 ,  '6:00:00' , '22:00:00'
        
        FROM inserted
                INSERT INTO HORARIO_CANCHAS
        (Cod_Cancha, Cod_Dia    , Hora_Inicio, Hora_Fin)
    SELECT
       Cod_Cancha  ,3 ,  '6:00:00' , '22:00:00'
        
        FROM inserted
                INSERT INTO HORARIO_CANCHAS
        (Cod_Cancha, Cod_Dia    , Hora_Inicio, Hora_Fin)
    SELECT
       Cod_Cancha  ,4 , '6:00:00' , '22:00:00'
        
        FROM inserted

            INSERT INTO HORARIO_CANCHAS
        (Cod_Cancha, Cod_Dia    , Hora_Inicio, Hora_Fin)
    SELECT
       Cod_Cancha  ,5 ,  '6:00:00' , '22:00:00'
        
        FROM inserted

              INSERT INTO HORARIO_CANCHAS
        (Cod_Cancha, Cod_Dia    , Hora_Inicio, Hora_Fin)
    SELECT
       Cod_Cancha  ,6 ,  '6:00:00' , '22:00:00'
        
        FROM inserted
                      INSERT INTO HORARIO_CANCHAS
        (Cod_Cancha, Cod_Dia    , Hora_Inicio, Hora_Fin)
    SELECT
       Cod_Cancha  ,7 , '6:00:00' , '22:00:00'
        
        FROM inserted