CREATE PROCEDURE AdaugaTranzactie
    @IDUtilizator INT,
    @Suma DECIMAL(10,2),
    @TipTranzactie VARCHAR(20)
AS
BEGIN
    INSERT INTO Tranzactii (IDUtilizator, Suma, TipTranzactie)
    VALUES (@IDUtilizator, @Suma, @TipTranzactie)
END
