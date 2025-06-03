CREATE PROCEDURE UpsertUser
    @NumeUtilizator VARCHAR(50),
    @EmailUser VARCHAR(100),
    @ParolaUser VARCHAR(255),
    @Sold DECIMAL(10,2)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM Users WHERE EmailUser = @EmailUser)
    BEGIN
        UPDATE Users
        SET NumeUtilizator = @NumeUtilizator,
            ParolaUser = @ParolaUser,
            Sold = @Sold
        WHERE EmailUser = @EmailUser
    END
    ELSE
    BEGIN
        INSERT INTO Users (NumeUtilizator, EmailUser, ParolaUser, Sold)
        VALUES (@NumeUtilizator, @EmailUser, @ParolaUser, @Sold)
    END
END
