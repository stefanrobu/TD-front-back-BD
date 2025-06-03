-- Upsert pentru un utilizator existent sau nou
EXEC UpsertUser  @NumeUtilizator = 'jucator01', @EmailUser = 'jucator01@email.com', @ParolaUser = 'parola1', @Sold = 100.00;
EXEC UpsertUser  @NumeUtilizator = 'jucator02', @EmailUser = 'jucator02@email.com', @ParolaUser = 'parola2', @Sold = 250.00;
EXEC UpsertUser  @NumeUtilizator = 'jucator03', @EmailUser = 'jucator03@email.com', @ParolaUser = 'parola3', @Sold = 0.00;
EXEC UpsertUser  @NumeUtilizator = 'admin', @EmailUser = 'admin@email.com', @ParolaUser = 'admin', @Sold = 10000.00;

-- Upsert pentru jocuri
EXEC UpsertJoc  @NumeJoc = 'Burning Hot', @TipJoc = 'slot', @PariuMinim = 0.50, @PariuMaxim = 100.00;
EXEC UpsertJoc  @NumeJoc = 'Shining Crown', @TipJoc = 'slot', @PariuMinim = 1.00, @PariuMaxim = 250.00;
EXEC UpsertJoc  @NumeJoc = 'Blackjack Clasic', @TipJoc = 'blackjack', @PariuMinim = 5.00, @PariuMaxim = 500.00;

-- Presupunem că utilizatorul cu ID 1 joacă la jocul cu ID 1
EXEC AdaugaPariu @IDUtilizator = 1, @IDJoc = 1, @SumaPariata = 20.00, @SumaCastigata = 50.00;
EXEC AdaugaPariu @IDUtilizator = 2, @IDJoc = 2, @SumaPariata = 10.00, @SumaCastigata = 0.00;
EXEC AdaugaPariu @IDUtilizator = 1, @IDJoc = 1, @SumaPariata = 10.00, @SumaCastigata = 25.00;
EXEC AdaugaPariu @IDUtilizator = 1, @IDJoc = 2, @SumaPariata = 20.00, @SumaCastigata = 0.00;
EXEC AdaugaPariu @IDUtilizator = 2, @IDJoc = 1, @SumaPariata = 15.00, @SumaCastigata = 0.00;
EXEC AdaugaPariu @IDUtilizator = 2, @IDJoc = 2, @SumaPariata = 5.00, @SumaCastigata = 15.00;
EXEC AdaugaPariu @IDUtilizator = 3, @IDJoc = 1, @SumaPariata = 50.00, @SumaCastigata = 100.00;
EXEC AdaugaPariu @IDUtilizator = 3, @IDJoc = 2, @SumaPariata = 25.00, @SumaCastigata = 0.00;
EXEC AdaugaPariu @IDUtilizator = 1, @IDJoc = 1, @SumaPariata = 30.00, @SumaCastigata = 60.00;
EXEC AdaugaPariu @IDUtilizator = 2, @IDJoc = 2, @SumaPariata = 10.00, @SumaCastigata = 0.00;
EXEC AdaugaPariu @IDUtilizator = 3, @IDJoc = 1, @SumaPariata = 5.00, @SumaCastigata = 15.00;
EXEC AdaugaPariu @IDUtilizator = 1, @IDJoc = 2, @SumaPariata = 40.00, @SumaCastigata = 0.00;


-- Depunere/Retreagere
EXEC Adaugatranzactie  @IDUtilizator = 1, @Suma = 100.00, @TipTranzactie = 'depunere';
EXEC Adaugatranzactie  @IDUtilizator = 2, @Suma = 50.00, @TipTranzactie = 'retragere';
EXEC Adaugatranzactie @IDUtilizator = 1, @Suma = 100.00, @TipTranzactie = 'depunere';
EXEC Adaugatranzactie @IDUtilizator = 2, @Suma = 50.00, @TipTranzactie = 'depunere';
EXEC Adaugatranzactie @IDUtilizator = 3, @Suma = 150.00, @TipTranzactie = 'depunere';
EXEC Adaugatranzactie @IDUtilizator = 1, @Suma = 30.00, @TipTranzactie = 'retragere';
EXEC Adaugatranzactie @IDUtilizator = 2, @Suma = 20.00, @TipTranzactie = 'retragere';
EXEC Adaugatranzactie @IDUtilizator = 3, @Suma = 70.00, @TipTranzactie = 'retragere';
EXEC Adaugatranzactie @IDUtilizator = 1, @Suma = 200.00, @TipTranzactie = 'depunere';
EXEC Adaugatranzactie @IDUtilizator = 2, @Suma = 100.00, @TipTranzactie = 'depunere';
EXEC Adaugatranzactie @IDUtilizator = 3, @Suma = 300.00, @TipTranzactie = 'depunere';
EXEC Adaugatranzactie @IDUtilizator = 1, @Suma = 50.00, @TipTranzactie = 'retragere';


SELECT * FROM Users;
SELECT * FROM Jocuri;
SELECT * FROM Pariuri;
SELECT * FROM Tranzactii;