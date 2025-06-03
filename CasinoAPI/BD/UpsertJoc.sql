CREATE PROCEDURE UpsertJoc
    @NumeJoc VARCHAR(100),
    @TipJoc VARCHAR(50),
    @PariuMinim DECIMAL(10,2),
    @PariuMaxim DECIMAL(10,2)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM Jocuri WHERE NumeJoc = @NumeJoc)
    BEGIN
        UPDATE Jocuri
        SET TipJoc = @TipJoc,
            PariuMinim = @PariuMinim,
            PariuMaxim = @PariuMaxim
        WHERE NumeJoc = @NumeJoc
    END
    ELSE
    BEGIN
        INSERT INTO Jocuri (NumeJoc, TipJoc, PariuMinim, PariuMaxim)
        VALUES (@NumeJoc, @TipJoc, @PariuMinim, @PariuMaxim)
    END
END
