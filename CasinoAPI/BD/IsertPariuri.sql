CREATE PROCEDURE AdaugaPariu
    @IDUtilizator INT,
    @IDJoc INT,
    @SumaPariata DECIMAL(10,2),
    @SumaCastigata DECIMAL(10,2)
AS
BEGIN
    INSERT INTO Pariuri (IDUtilizator, IDJoc, SumaPariata, SumaCastigata)
    VALUES (@IDUtilizator, @IDJoc, @SumaPariata, @SumaCastigata)
END
